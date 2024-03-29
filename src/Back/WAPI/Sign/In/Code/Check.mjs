/**
 * Check one-time sign-in code and to initiate new session.
 *
 * @namespace Fl32_Bwl_Back_WAPI_Sign_In_Code_Check
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_WAPI_Sign_In_Code_Check';

/**
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class Fl32_Bwl_Back_WAPI_Sign_In_Code_Check {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
        /** @type {TeqFw_Web_Back_Util.cookieCreate|function} */
        const cookieCreate = spec['TeqFw_Web_Back_Util#cookieCreate'];
        /** @type {Fl32_Bwl_Back_Act_Sign_In_Code_CleanUp.process|function} */
        const aCodeCleanUp = spec['Fl32_Bwl_Back_Act_Sign_In_Code_CleanUp$'];
        /** @type {Fl32_Bwl_Back_Act_Sign_In_Code_Remove.process|function} */
        const aCodeRemove = spec['Fl32_Bwl_Back_Act_Sign_In_Code_Remove$'];
        /** @type {Fl32_Teq_User_Back_Process_Session_Open} */
        const aSessionOpen = spec['Fl32_Teq_User_Back_Process_Session_Open$'];
        /** @type {Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check.Factory} */
        const route = spec['Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check#Factory$'];
        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
        const metaSignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In$'];

        // DEFINE WORKING VARS / PROPS
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.ATTR} */
        const A_SIGN_IN = metaSignIn.getAttributes();

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Handler_WAPI_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS
                /**
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
                 * @param {string} code
                 * @returns {Promise<number|null>}
                 */
                async function getUserIdByCode(trx, code) {
                    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.Dto} */
                    const found = await crud.readOne(trx, metaSignIn, {[A_SIGN_IN.CODE]: code});
                    return found?.user_ref ?? null;
                }

                /**
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
                 * @param {Number} userId
                 * @returns {Promise<{cookie: *, sessionId: string}>}
                 */
                async function initSession(trx, userId) {
                    // generate user session
                    const {output: {sessId}} = await aSessionOpen.exec({trx, userId});
                    const sessionId = sessId;
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
                /** @type {Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check.Response} */
                const res = context.getOutData();
                //
                const trx = await conn.startTransaction();
                try {
                    const code = req.code;
                    await aCodeCleanUp({trx});
                    const userId = await getUserIdByCode(trx, code);
                    if (userId !== null) {
                        await aCodeRemove({trx, code});
                        const {sessionId, cookie} = await initSession(trx, userId);
                        context.setOutHeader(H2.HTTP2_HEADER_SET_COOKIE, cookie);
                        res.sessionId = sessionId;
                        logger.info(`New session '${sessionId.substr(0, 8)}...' for user #${userId} is established.`);
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
