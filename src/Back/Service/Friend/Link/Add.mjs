/**
 * Service to establish friendship relations using generated code.
 *
 * @namespace Fl32_Bwl_Back_Service_Friend_Link_Add
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Friend_Link_Add';

/**
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Bwl_Back_Service_Friend_Link_Add {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // singleton
        /** @type {TeqFw_Core_Db_Connector} */
        const rdb = spec['TeqFw_Core_Db_Connector$'];  // singleton
        /** @type {TeqFw_Core_Logger} */
        const logger = spec['TeqFw_Core_Logger$'];  // singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Factory} */
        const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Add#Factory$']; // singleton
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp.process} */
        const procCleanUp = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp$']; // singleton
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_Get.process } */
        const procGet = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_Get$']; // singleton
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Add.process } */
        const procAdd = spec['Fl32_Bwl_Back_Process_Friend_Link_Add$']; // singleton
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_Remove.process} */
        const procRemove = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_Remove$']; // singleton

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_FRIEND_LINK_ADD;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {function(TeqFw_Http2_Back_Server_Stream_Context): Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Request}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Request}
             * @memberOf Fl32_Bwl_Back_Service_Friend_Link_Add
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
         * @returns {function(TeqFw_Http2_Plugin_Handler_Service.Context): TeqFw_Http2_Plugin_Handler_Service.Result}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Plugin_Handler_Service.Context} apiCtx
             * @returns {Promise<TeqFw_Http2_Plugin_Handler_Service.Result>}
             * @memberOf Fl32_Bwl_Back_Service_Friend_Link_Add
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = factRoute.createRes();
                result.response = response;
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    const trx = await rdb.startTransaction();
                    try {
                        await procCleanUp({trx});
                        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
                        const link = await procGet({trx, code: apiReq.code});
                        if (link) {
                            if (link.leader_ref !== user.id) {
                                await procAdd({trx, leaderId: link.leader_ref, wingmanId: user.id});
                                response.success = true;
                            } else {
                                const msg = `Cannot link user for himself. User ID: ${user.id}, code: ${apiReq.code}.`;
                                logger.error(msg);
                                response.failureCause = msg;
                            }
                            await procRemove({trx, code: apiReq.code});
                        } else {
                            const msg = `Cannot find friendship link with code '${apiReq.code}'.`;
                            logger.error(msg);
                            response.failureCause = msg;
                        }
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    result.headers[H2.HTTP2_HEADER_STATUS] = H2.HTTP_STATUS_UNAUTHORIZED;
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

export default Fl32_Bwl_Back_Service_Friend_Link_Add;
