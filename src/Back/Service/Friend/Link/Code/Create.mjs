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
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        const {
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request} */
            Request,
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Response} */
            Response
        } = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create']; // ES6 module
        /** @type {typeof Fl32_Bwl_Shared_Service_Data_Friend_Link} */
        const DLink = spec['Fl32_Bwl_Shared_Service_Data_Friend_Link#']; // class
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp.process} */
        const procCleanUp = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp$']; // function singleton
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_Create.process} */
        const procCreate = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_Create$']; // function singleton

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
                // clone HTTP body into API request object
                return Object.assign(new Request(), body.data);
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
                // DEFINE INNER FUNCTIONS

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = new Response();
                result.response = response;
                // /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request} */
                // const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                /** @type {Fl32_Teq_User_Shared_Dto_User} */
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
