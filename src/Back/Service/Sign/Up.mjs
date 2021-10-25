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
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Core_Shared_Util.formatUtcDateTime|function} */
        const formatUtcDateTime = spec['TeqFw_Core_Shared_Util#formatUtcDateTime'];
        /** @type {TeqFw_Web_Back_Util.cookieCreate|function} */
        const cookieCreate = spec['TeqFw_Web_Back_Util#cookieCreate'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Sign_Up#Factory$'];
        /** @type {Fl32_Teq_User_Back_Process_Referral_Link_CleanUp.process|function} */
        const procRefCleanUp = spec['Fl32_Teq_User_Back_Process_Referral_Link_CleanUp$'];
        /** @type {Fl32_Teq_User_Back_Process_Referral_Link_Get.process|function} */
        const procRefGet = spec['Fl32_Teq_User_Back_Process_Referral_Link_Get$'];
        /** @type {Fl32_Teq_User_Back_Process_Referral_Link_Remove.process|function} */
        const procRefRemove = spec['Fl32_Teq_User_Back_Process_Referral_Link_Remove$'];
        /** @type {Fl32_Teq_User_Back_Process_User_Create.process|function} */
        const procCreate = spec['Fl32_Teq_User_Back_Process_User_Create$'];
        /** @type {Fl32_Teq_User_Back_Process_Session_Open} */
        const procSessionOpen = spec['Fl32_Teq_User_Back_Process_Session_Open$'];
        /** @type {Fl32_Bwl_Back_Process_Profile_Save.process|function} */
        const procAppProfileSave = spec['Fl32_Bwl_Back_Process_Profile_Save$'];
        /** @type {Fl32_Bwl_Back_Process_Weight_Stat_Save.process|function} */
        const procWeightSave = spec['Fl32_Bwl_Back_Process_Weight_Stat_Save$'];
        /** @type {typeof Fl32_Teq_User_Shared_Service_Dto_User} */
        const DUser = spec['Fl32_Teq_User_Shared_Service_Dto_User#'];
        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const metaWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat$'];
        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
        const metaAppProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.STAT_TYPE} */
        const TYPE_WEIGHT = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#STAT_TYPE$'];

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
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
                 * @param {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} req
                 * @param {number} userId
                 * @return {Promise<void>}
                 */
                async function addProfile(trx, req, userId) {
                    // noinspection JSValidateTypes
                    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Profile.Dto} */
                    const input = metaAppProfile.createDto();
                    input.age = req.age;
                    input.height = req.height;
                    input.is_female = req.isFemale;
                    input.user_ref = userId;
                    await procAppProfileSave({trx, input});
                }

                /**
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
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

                /**
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
                 * @param {number} userId
                 * @param {number} weight
                 * @param {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.STAT_TYPE} type
                 * @return {Promise<void>}
                 */
                async function addWeight(trx, userId, weight, type) {
                    // noinspection JSValidateTypes
                    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.Dto} */
                    const payload = metaWeightStat.createDto();
                    payload.type = type;
                    payload.date = formatUtcDateTime();
                    payload.user_ref = userId;
                    payload.value = weight;
                    await procWeightSave({trx, payload});
                }

                /**
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
                 * @param {number} userId
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
                const trx = await conn.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} */
                try {
                    // clean up expired links
                    await procRefCleanUp({trx});
                    // load link data by code
                    const code = req.refCode;
                    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Link.Dto} */
                    const linkData = await procRefGet({trx, code});
                    if (linkData) {
                        const parentId = linkData.user_ref;
                        const userId = await addUser(trx, req, parentId);
                        await addProfile(trx, req, userId);
                        await addWeight(trx, userId, req.weight, TYPE_WEIGHT.CURRENT);
                        await addWeight(trx, userId, req.weight, TYPE_WEIGHT.TARGET);
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
