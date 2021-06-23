import {constants as H2} from 'http2';

/**
 * Service to save weight stats data for the user.
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
export default class Fl32_Bwl_Back_Service_Weight_Stat_Save {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // singleton
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];  // singleton
        /** @type {TeqFw_Core_Shared_Util.formatDateTime} */
        const formatDateTime = spec['TeqFw_Core_Shared_Util#formatDateTime']; // function instance
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        const {
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Types} */
            Types
        } = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save']; // ES6 module
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Factory} */
        const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Factory$']; // singleton
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#']; // class
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#']; // class
        /** @function {@type Fl32_Bwl_Back_Process_Weight_Stat_Save.process} */
        const procSave = spec['Fl32_Bwl_Back_Process_Weight_Stat_Save$']; // singleton

        this.getRoute = function () {
            return DEF.SERV_WEIGHT_STAT_SAVE;
        };

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Api_Back_Service_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Request}
             * @memberOf Fl32_Bwl_Back_Service_Weight_Stat_Save
             * @implements TeqFw_Http2_Api_Back_Service_Factory.parse
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                return factRoute.createReq(body.data);
            }

            // COMPOSE RESULT
            Object.defineProperty(parse, 'name', {value: `${this.constructor.name}.${parse.name}`});
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
             * @memberOf Fl32_Bwl_Back_Service_Weight_Stat_Save
             * @implements {TeqFw_Http2_Api_Back_Service_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS

                async function saveCurrent(trx, apiReq, user) {
                    const payload = new EWeightStat();
                    payload[EWeightStat.A_DATE] = apiReq.date;
                    payload[EWeightStat.A_USER_REF] = user.id;
                    payload[EWeightStat.A_VALUE] = apiReq.weight;
                    await procSave({trx, payload});
                }

                async function saveToProfile(trx, userId, weight, type, date) {
                    const input = {[EProfile.A_DATE_UPDATED]: date};
                    if (type === Types.TARGET) {
                        input[EProfile.A_WEIGHT_TARGET] = weight;
                    }
                    await trx(EProfile.ENTITY)
                        .update(input)
                        .where(EProfile.A_USER_REF, userId);
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = factRoute.createRes();
                result.response = response;
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
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
