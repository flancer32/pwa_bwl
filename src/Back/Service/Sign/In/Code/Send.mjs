/**
 * Service to send one-time sign in code to email.
 *
 * @namespace Fl32_Bwl_Back_Service_Sign_In_Code_Send
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Sign_In_Code_Send';

/**
 * Service to remove weight stats data for the user.
 * @extends TeqFw_Http2_Back_Server_Handler_Api_Factory
 */
class Fl32_Bwl_Back_Service_Sign_In_Code_Send {

    constructor(spec) {
        // PARSE INPUT, INIT PROPS, DEFINE WORKING VARS
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Back_Server_Handler_Api_Result} */
        const ApiResult = spec['TeqFw_Http2_Back_Server_Handler_Api#Result']; // class constructor
        const {
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Request} */
            Request,
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Response} */
            Response
        } = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send']; // ES6 module
        /** @function {@type Fl32_Bwl_Back_Process_Sign_In_Code_Create.process} */
        const procCreate = spec['Fl32_Bwl_Back_Process_Sign_In_Code_Create$']; // function singleton

        // DEFINE INNER FUNCTIONS

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_SIGN_IN_CODE_SEND;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Back_Server_Handler_Api_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Request}
             * @memberOf Fl32_Bwl_Back_Service_Sign_In_Code_Send
             * @implements TeqFw_Http2_Back_Server_Handler_Api_Factory.parse
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Request} */
                const result = Object.assign(new Request(), body.data); // clone HTTP body into API request object
                result.date = new Date(result.date);
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(parse, 'name', {value: `${NS}.${parse.name}`});
            return parse;
        };

        /**
         * Factory to create service (handler to process HTTP API request).
         * @returns {TeqFw_Http2_Back_Server_Handler_Api_Factory.service}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Handler_Api_Context} apiCtx
             * @returns {Promise<TeqFw_Http2_Back_Server_Handler_Api_Result>}
             * @memberOf Fl32_Bwl_Back_Service_Sign_In_Code_Send
             * @implements {TeqFw_Http2_Back_Server_Handler_Api_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = new Response();
                result.response = response;
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Request} */
                const apiReq = apiCtx.request;
                // const shared = apiCtx.sharedContext;
                try {
                    const res = await procCreate({trx, email: apiReq.email});
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

export default Fl32_Bwl_Back_Service_Sign_In_Code_Send;