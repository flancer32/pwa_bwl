/**
 * Service to sign up new user w/o password.
 *
 * @namespace Fl32_Bwl_Back_Service_Sign_Up
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Sign_Up';

/**
 * Service to sign up new user w/o password.
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Bwl_Back_Service_Sign_Up {

    constructor(spec) {
        // PARSE INPUT, INIT PROPS, DEFINE WORKING VARS
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        /** @type {TeqFw_Core_App_Shared_Util.formatUtcDateTime} */
        const formatUtcDateTime = spec['TeqFw_Core_App_Shared_Util#formatUtcDateTime']; // function instance
        const {
            /** @function {typeof TeqFw_Http2_Back_Util.cookieCreate} */
            cookieCreate
        } = spec['TeqFw_Http2_Back_Util']; // ES6 module destructing
        /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Factory} */
        const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Sign_Up#Factory$']; // singleton
        /** @function {@type Fl32_Teq_User_Back_Process_Referral_Link_CleanUp.process} */
        const procRefCleanUp = spec['Fl32_Teq_User_Back_Process_Referral_Link_CleanUp$']; // function singleton
        /** @function {@type Fl32_Teq_User_Back_Process_Referral_Link_Get.process} */
        const procRefGet = spec['Fl32_Teq_User_Back_Process_Referral_Link_Get$']; // function singleton
        /** @function {@type Fl32_Teq_User_Back_Process_Referral_Link_Remove.process} */
        const procRefRemove = spec['Fl32_Teq_User_Back_Process_Referral_Link_Remove$']; // function singleton
        /** @function {@type Fl32_Teq_User_Back_Process_User_Create.process} */
        const procCreate = spec['Fl32_Teq_User_Back_Process_User_Create$']; // function singleton
        /** @type {Fl32_Teq_User_Back_Process_Session_Open} */
        const procSessionOpen = spec['Fl32_Teq_User_Back_Process_Session_Open$']; // instance singleton
        /** @function {@type Fl32_Bwl_Back_Process_Profile_Save.process} */
        const procAppProfileSave = spec['Fl32_Bwl_Back_Process_Profile_Save$']; // function singleton
        /** @function {@type Fl32_Bwl_Back_Process_Weight_Stat_Save.process} */
        const procWeightSave = spec['Fl32_Bwl_Back_Process_Weight_Stat_Save$']; // instance singleton
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#']; // class
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#']; // class
        /** @type {typeof Fl32_Teq_User_Shared_Service_Dto_User} */
        const DUser = spec['Fl32_Teq_User_Shared_Service_Dto_User#']; // class

        // DEFINE INNER FUNCTIONS

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_SIGN_UP;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Api_Back_Service_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request}
             * @memberOf Fl32_Bwl_Back_Service_Sign_Up
             * @implements TeqFw_Http2_Api_Back_Service_Factory.parse
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                return factRoute.createReq(body.data);
            }

            // COMPOSE RESULT
            Object.defineProperty(parse, 'name', {value: `${NS}.${parse.name}`});
            return parse;
        };

        /**
         * Factory to create service (handler to process HTTP API request).
         * @returns {TeqFw_Http2_Api_Back_Service_Factory.service}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Plugin_Handler_Service.Context} apiCtx
             * @returns {Promise<TeqFw_Http2_Plugin_Handler_Service.Result>}
             * @memberOf Fl32_Bwl_Back_Service_Sign_Up
             * @implements {TeqFw_Http2_Api_Back_Service_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS

                async function addProfile(trx, req, userId) {
                    const entity = new EProfile();
                    entity[EProfile.A_AGE] = apiReq.age;
                    entity[EProfile.A_HEIGHT] = apiReq.height;
                    entity[EProfile.A_IS_FEMALE] = apiReq.isFemale;
                    entity[EProfile.A_USER_REF] = userId;
                    entity[EProfile.A_WEIGHT_INIT] = apiReq.weight;
                    entity[EProfile.A_WEIGHT_TARGET] = apiReq.weight;
                    await procAppProfileSave({trx, input: entity});
                }

                /**
                 * @param trx
                 * @param {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} req
                 * @param {Number} parentId
                 * @returns {Promise<void>}
                 */
                async function addUser(trx, req, parentId) {
                    const user = new DUser();
                    user.name = req.name;
                    user.emails = [req.email];
                    if (req.phone) user.phones = [req.phone];
                    user.parentId = parentId;
                    const userId = await procCreate({trx, user});
                    return userId;
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
                        path: `/${DEF.REALM_PUB}`
                    });
                    return {sessionId, cookie};
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = factRoute.createRes();
                result.response = response;
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} */
                const apiReq = apiCtx.request;
                try {
                    // clean up expired links
                    await procRefCleanUp({trx});
                    // load link data by code
                    const code = apiReq.refCode;
                    /** @type {Fl32_Teq_User_Store_RDb_Schema_Ref_Link} */
                    const linkData = await procRefGet({trx, code});
                    if (linkData) {
                        const parentId = linkData.user_ref;
                        const userId = await addUser(trx, apiReq, parentId);
                        await addProfile(trx, apiReq, userId);
                        await addCurrentWeight(trx, userId, apiReq.weight);
                        await procRefRemove({trx, code});
                        const {sessionId, cookie} = await initSession(trx, userId);
                        result.headers[H2.HTTP2_HEADER_SET_COOKIE] = cookie;
                        response.sessionId = sessionId;
                    }
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        };
    }

    // DEFINE PROTO METHODS
}

export default Fl32_Bwl_Back_Service_Sign_Up;
