/**
 * Service to check one-time sign-in code and to initiate new session.
 *
 * @namespace Fl32_Bwl_Back_Service_Sign_In_Code_Check
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Sign_In_Code_Check';

/**
 * Service to check one-time sign-in code and to initiate new session.
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Bwl_Back_Service_Sign_In_Code_Check {

    constructor(spec) {
        // PARSE INPUT, INIT PROPS, DEFINE WORKING VARS
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // singleton
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];  // singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Factory} */
        const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check#Factory$']; // singleton
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
        const ESignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In#']; // class
        /** @function {@type TeqFw_Http2_Back_Util.cookieCreate} */
        const cookieCreate = spec['TeqFw_Http2_Back_Util#cookieCreate']; // singleton
        /** @function {@type Fl32_Bwl_Back_Process_Sign_In_Code_CleanUp.process} */
        const procCodeCleanUp = spec['Fl32_Bwl_Back_Process_Sign_In_Code_CleanUp$']; // singleton
        /** @function {@type Fl32_Bwl_Back_Process_Sign_In_Code_Remove.process} */
        const procCodeRemove = spec['Fl32_Bwl_Back_Process_Sign_In_Code_Remove$']; // singleton
        /** @type {Fl32_Teq_User_Back_Process_Session_Open} */
        const procSessionOpen = spec['Fl32_Teq_User_Back_Process_Session_Open$']; // singleton

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_SIGN_IN_CODE_CHECK;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Api_Back_Service_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Request}
             * @memberOf Fl32_Bwl_Back_Service_Sign_In_Code_Check
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
             * @memberOf Fl32_Bwl_Back_Service_Sign_In_Code_Check
             * @implements {TeqFw_Http2_Api_Back_Service_Factory.service}
             */
            async function service(apiCtx) {
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
                        path: `/${DEF.REALM_PUB}`
                    });
                    return {sessionId, cookie};
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = factRoute.createRes();
                response.isSent = false;
                result.response = response;
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Request} */
                const apiReq = apiCtx.request;
                try {
                    const code = apiReq.code;
                    await procCodeCleanUp({trx});
                    const userId = await getUserIdByCode(trx, code);
                    if (userId !== null) {
                        await procCodeRemove({trx, code});
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
}

export default Fl32_Bwl_Back_Service_Sign_In_Code_Check;
