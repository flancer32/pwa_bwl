import {constants as H2} from 'http2';

/**
 * Service to save sign up data from second step.
 * @extends TeqFw_Http2_Back_Server_Handler_Api_Factory
 */
export default class Fl32_Bwl_Back_Service_SignUp_Init {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Back_Server_Handler_Api_Result} */
        const ApiResult = spec['TeqFw_Http2_Back_Server_Handler_Api#Result']; // class constructor
        const {
            /** @type {Fl32_Bwl_Shared_Service_Route_SignUp_Init_Request} */
            Request,
            /** @type {Fl32_Bwl_Shared_Service_Route_SignUp_Init_Request} */
            Response
        } = spec['Fl32_Bwl_Shared_Service_Route_SignUp_Init']; // ES6 module
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile#']; // class constructor
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Store_RDb_Schema_Weight_Stat#']; // class constructor
        /** @function {typeof Fl32_Bwl_Back_Process_Profile_Save.process} */
        const procAppProfSave = spec['Fl32_Bwl_Back_Process_Profile_Save$']; // instance singleton

        this.getRoute = function () {
            return DEF.SERV_SIGN_UP_INIT;
        };

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Back_Server_Handler_Api_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_SignUp_Init_Request}
             * @memberOf Fl32_Bwl_Back_Service_SignUp_Init
             * @implements TeqFw_Http2_Back_Server_Handler_Api_Factory.parse
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                return Object.assign(new Request(), body.data); // clone HTTP body into API request object
            }

            // COMPOSE RESULT
            Object.defineProperty(parse, 'name', {value: `${this.constructor.name}.${parse.name}`});
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
             * @memberOf Fl32_Bwl_Back_Service_SignUp_Init
             * @implements {TeqFw_Http2_Back_Server_Handler_Api_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                result.response = new Response();
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_SignUp_Init_Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                try {
                    /** @type {Fl32_Teq_User_Shared_Api_Data_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        const entity = new EProfile();
                        entity[EProfile.A_AGE] = apiReq.age;
                        entity[EProfile.A_HEIGHT] = apiReq.height;
                        entity[EProfile.A_IS_FEMALE] = apiReq.isFemale;
                        entity[EProfile.A_USER_REF] = user.id;
                        entity[EProfile.A_WEIGHT_INIT] = apiReq.weightInit;
                        entity[EProfile.A_WEIGHT_TARGET] = apiReq.weightTarget;
                        await procAppProfSave({trx, input: entity});
                        // save first weight stats item
                        await trx(EWeightStat.ENTITY)
                            .insert({
                                [EWeightStat.A_USER_REF]: user.id,
                                [EWeightStat.A_VALUE]: apiReq.weightInit,
                            });
                    } else {
                        result.headers[H2.HTTP2_HEADER_STATUS] = H2.HTTP_STATUS_UNAUTHORIZED;
                    }
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(service, 'name', {value: `${this.constructor.name}.${service.name}`});
            return service;
        };
    }

}
