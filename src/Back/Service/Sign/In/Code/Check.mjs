/**
 * Check one-time sign-in code and to initiate new session.
 *
 * @namespace Fl32_Bwl_Back_Service_Sign_In_Code_Check
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Sign_In_Code_Check';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Sign_In_Code_Check {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
        const ESignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In#'];
        /** @function {@type TeqFw_Web_Back_Util.cookieCreate} */
        const cookieCreate = spec['TeqFw_Web_Back_Util#cookieCreate'];
        /** @function {@type Fl32_Bwl_Back_Process_Sign_In_Code_CleanUp.process} */
        const procCodeCleanUp = spec['Fl32_Bwl_Back_Process_Sign_In_Code_CleanUp$'];
        /** @function {@type Fl32_Bwl_Back_Process_Sign_In_Code_Remove.process} */
        const procCodeRemove = spec['Fl32_Bwl_Back_Process_Sign_In_Code_Remove$'];
        /** @type {Fl32_Teq_User_Back_Process_Session_Open} */
        const procSessionOpen = spec['Fl32_Teq_User_Back_Process_Session_Open$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS
                /**
                 * @param trx
                 * @param {String} code
                 * @returns {Promise<null|Number>}
                 */
                async function getUserIdByCode(trx, code) {
                    const query = trx.from(ESignIn.ENTITY);
                    query.select([ESignIn.A_USER_REF]);
                    query.where({
                        [ESignIn.A_CODE]: code
                    });
                    /** @type {Array} */
                    const rs = await query;
                    if (rs.length === 1) {
                        const [first] = rs;
                        return first[ESignIn.A_USER_REF];
                    } else {
                        return null;
                    }
                }

                /**
                 * @param trx
                 * @param {Number} userId
                 * @returns {Promise<{cookie: *, sessionId: string}>}
                 */
                async function initSession(trx, userId) {
                    // generate user session
                    const {output} = await procSessionOpen.exec({trx, userId});
                    const sessionId = output.sessId;
                    // set session cookie
                    const cookie = cookieCreate({
                        name: DEF.MOD_USER.SESSION_COOKIE_NAME,
                        value: sessionId,
                        expires: DEF.MOD_USER.SESSION_COOKIE_LIFETIME,
                        path: `/${DEF.SHARED.DOOR_PUB}`
                    });
                    return {sessionId, cookie};
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Response} */
                const res = context.getOutData();
                //
                const trx = await rdb.startTransaction();
                try {
                    const code = req.code;
                    await procCodeCleanUp({trx:trx.getTrx()});
                    const userId = await getUserIdByCode(trx.getTrx(), code);
                    if (userId !== null) {
                        await procCodeRemove({trx:trx.getTrx(), code});
                        const {sessionId, cookie} = await initSession(trx.getTrx(), userId);
                        context.setOutHeader(H2.HTTP2_HEADER_SET_COOKIE, cookie);
                        res.sessionId = sessionId;
                    }
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }

    }
}
