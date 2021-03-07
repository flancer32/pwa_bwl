import {constants as H2} from 'http2';

/**
 * Service to save weight stats data for the user.
 * @extends TeqFw_Http2_Back_Server_Handler_Api_Factory
 */
export default class Fl32_Bwl_Back_Service_Weight_Stat_Save {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {TeqFw_Core_App_Shared_Util.formatDateTime} */
        const formatDateTime = spec['TeqFw_Core_App_Shared_Util#formatDateTime']; // function instance
        /** @type {typeof TeqFw_Http2_Back_Server_Handler_Api_Result} */
        const ApiResult = spec['TeqFw_Http2_Back_Server_Handler_Api#Result']; // class constructor
        const {
            /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request} */
            Request,
            /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Response} */
            Response,
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types} */
            Types
        } = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save']; // ES6 module
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Store_RDb_Schema_Weight_Stat#']; // class constructor
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile#']; // class constructor
        /** @type {Fl32_Bwl_Back_Process_Weight_Stat_Save} */
        const procSave = spec['Fl32_Bwl_Back_Process_Weight_Stat_Save$']; // instance singleton

        this.getRoute = function () {
            return DEF.SERV_WEIGHT_STAT_SAVE;
        };

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Back_Server_Handler_Api_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request}
             * @memberOf Fl32_Bwl_Back_Service_Weight_Stat_Save
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
             * @memberOf Fl32_Bwl_Back_Service_Weight_Stat_Save
             * @implements {TeqFw_Http2_Back_Server_Handler_Api_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS

                const saveCurrent = async (trx, apiReq, user) => {
                    const entity = new EWeightStat();
                    entity[EWeightStat.A_DATE] = apiReq.date;
                    entity[EWeightStat.A_USER_REF] = user.id;
                    entity[EWeightStat.A_VALUE] = apiReq.weight;
                    await procSave.exec({trx, input: entity});
                };

                const saveToProfile = async (trx, userId, weight, type, date) => {
                    const input = {[EProfile.A_DATE_UPDATED]: date};
                    if (type === Types.START) {
                        input[EProfile.A_WEIGHT_INIT] = weight;
                    } else if (type === Types.TARGET) {
                        input[EProfile.A_WEIGHT_TARGET] = weight;
                    }
                    await trx(EProfile.ENTITY)
                        .update(input)
                        .where(EProfile.A_USER_REF, userId);
                };

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                result.response = new Response();
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Data_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        if (apiReq.type === Types.CURRENT) {
                            await saveCurrent(trx, apiReq, user);
                        } else {
                            const date = formatDateTime(apiReq.date);
                            await saveToProfile(trx, user.id, apiReq.weight, apiReq.type, date);
                        }

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
