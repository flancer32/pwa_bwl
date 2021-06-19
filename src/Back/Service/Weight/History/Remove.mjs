/**
 * Service to remove weight stats data for the user.
 *
 * @namespace Fl32_Bwl_Back_Service_Weight_History_Remove
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Weight_History_Remove';

/**
 * Service to remove weight stats data for the user.
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
export default class Fl32_Bwl_Back_Service_Weight_History_Remove {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        const {
            /** @type {TeqFw_Core_App_Shared_Util.formatDate} */
            formatDate
        } = spec['TeqFw_Core_App_Shared_Util']; // ES6 module destructing
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Factory} */
        const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_Remove#Factory$']; // singleton
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#']; // class

        this.getRoute = function () {
            return DEF.SERV_WEIGHT_HISTORY_REMOVE;
        };

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Api_Back_Service_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Request}
             * @memberOf Fl32_Bwl_Back_Service_Weight_History_Remove
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
             * @memberOf Fl32_Bwl_Back_Service_Weight_History_Remove
             * @implements {TeqFw_Http2_Api_Back_Service_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS
                async function removeItems(trx, userId, date) {
                    const query = trx.from(EWeightStat.ENTITY)
                        .where(EWeightStat.A_USER_REF, userId)
                        .where(EWeightStat.A_DATE, formatDate(date));
                    return await query.del();
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = factRoute.createRes();
                result.response = response;
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        response.removed = await removeItems(trx, user.id, apiReq.date);
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
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        };
    }

}
