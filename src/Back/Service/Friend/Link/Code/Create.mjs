/**
 * Service to generate code for link to establish friendship relations.
 *
 * @namespace Fl32_Bwl_Back_Service_Friend_Link_Code_Create
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Friend_Link_Code_Create';

/**
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Bwl_Back_Service_Friend_Link_Code_Create {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // singleton
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];  // singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Factory} */
        const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create#Factory$']; // singleton
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Friend_Link} */
        const DLink = spec['Fl32_Bwl_Shared_Service_Dto_Friend_Link#']; // class
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp.process} */
        const procCleanUp = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp$']; // singleton
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_Create.process} */
        const procCreate = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_Create$']; // singleton

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_FRIEND_LINK_CODE_CREATE;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {function(TeqFw_Http2_Back_Server_Stream_Context): Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request}
             * @memberOf Fl32_Bwl_Back_Service_Friend_Link_Code_Create
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
             * @memberOf Fl32_Bwl_Back_Service_Friend_Link_Code_Create
             */
            async function service(apiCtx) {
                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = factRoute.createRes();
                result.response = response;
                const shared = apiCtx.sharedContext;
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        await procCleanUp({trx});
                        const {link: code, dateExp} = await procCreate({trx, userId: user.id});
                        const link = new DLink();
                        link.code = code;
                        link.dateExpired = dateExp;
                        response.link = link;
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

export default Fl32_Bwl_Back_Service_Friend_Link_Code_Create;
