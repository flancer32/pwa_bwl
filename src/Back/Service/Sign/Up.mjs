/**
 * Sign up new user w/o password.
 *
 * @namespace Fl32_Bwl_Back_Service_Sign_Up
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Sign_Up';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Sign_Up {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];
        /** @type {TeqFw_Core_Shared_Util.formatUtcDateTime} */
        const formatUtcDateTime = spec['TeqFw_Core_Shared_Util#formatUtcDateTime'];
        /** @type {Function|TeqFw_Web_Back_Util.cookieCreate} */
        const cookieCreate = spec['TeqFw_Web_Back_Util#cookieCreate'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Sign_Up#Factory$'];
        /** @function {@type Fl32_Teq_User_Back_Process_Referral_Link_CleanUp.process} */
        const procRefCleanUp = spec['Fl32_Teq_User_Back_Process_Referral_Link_CleanUp$'];
        /** @function {@type Fl32_Teq_User_Back_Process_Referral_Link_Get.process} */
        const procRefGet = spec['Fl32_Teq_User_Back_Process_Referral_Link_Get$'];
        /** @function {@type Fl32_Teq_User_Back_Process_Referral_Link_Remove.process} */
        const procRefRemove = spec['Fl32_Teq_User_Back_Process_Referral_Link_Remove$'];
        /** @function {@type Fl32_Teq_User_Back_Process_User_Create.process} */
        const procCreate = spec['Fl32_Teq_User_Back_Process_User_Create$'];
        /** @type {Fl32_Teq_User_Back_Process_Session_Open} */
        const procSessionOpen = spec['Fl32_Teq_User_Back_Process_Session_Open$'];
        /** @function {@type Fl32_Bwl_Back_Process_Profile_Save.process} */
        const procAppProfileSave = spec['Fl32_Bwl_Back_Process_Profile_Save$'];
        /** @function {@type Fl32_Bwl_Back_Process_Weight_Stat_Save.process} */
        const procWeightSave = spec['Fl32_Bwl_Back_Process_Weight_Stat_Save$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#'];
        /** @type {typeof Fl32_Teq_User_Shared_Service_Dto_User} */
        const DUser = spec['Fl32_Teq_User_Shared_Service_Dto_User#'];


        // DEFINE INSTANCE METHODS

        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_IContext} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS

                async function addProfile(trx, req, userId) {
                    const entity = new EProfile();
                    entity[EProfile.A_AGE] = req.age;
                    entity[EProfile.A_HEIGHT] = req.height;
                    entity[EProfile.A_IS_FEMALE] = req.isFemale;
                    entity[EProfile.A_USER_REF] = userId;
                    entity[EProfile.A_WEIGHT_TARGET] = req.weight;
                    await procAppProfileSave({trx, input: entity});
                }

                /**
                 * @param trx
                 * @param {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} req
                 * @param {Number} parentId
                 * @returns {Promise<number>}
                 */
                async function addUser(trx, req, parentId) {
                    const user = new DUser();
                    user.name = req.name;
                    user.emails = [req.email];
                    if (req.phone) user.phones = [req.phone];
                    user.parentId = parentId;
                    return await procCreate({trx, user});
                }

                async function addCurrentWeight(trx, userId, weight) {
                    const payload = new EWeightStat();
                    payload[EWeightStat.A_DATE] = formatUtcDateTime();
                    payload[EWeightStat.A_USER_REF] = userId;
                    payload[EWeightStat.A_VALUE] = weight;
                    await procWeightSave({trx, payload});
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
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Response} */
                const res = context.getOutData();
                // const shared = context.getHandlersShare();
                //
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} */
                try {
                    // clean up expired links
                    await procRefCleanUp({trx});
                    // load link data by code
                    const code = req.refCode;
                    /** @type {Fl32_Teq_User_Store_RDb_Schema_Ref_Link} */
                    const linkData = await procRefGet({trx, code});
                    if (linkData) {
                        const parentId = linkData.user_ref;
                        const userId = await addUser(trx, req, parentId);
                        await addProfile(trx, req, userId);
                        await addCurrentWeight(trx, userId, req.weight);
                        await procRefRemove({trx, code});
                        const {sessionId, cookie} = await initSession(trx, userId);
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
