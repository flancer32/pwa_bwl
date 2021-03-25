/**
 * Service to get weight stats data for the user.
 *
 * @namespace Fl32_Bwl_Back_Service_Weight_History_List
 */
import {constants as H2} from 'http2';

/**
 * Service to get weight stats data for the user.
 * @extends TeqFw_Http2_Back_Server_Handler_Api_Factory
 */
export default class Fl32_Bwl_Back_Service_Weight_History_List {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        const {
            /** @type {TeqFw_Core_App_Shared_Util.formatDate} */
            formatDate
        } = spec['TeqFw_Core_App_Shared_Util']; // ES6 module
        /** @type {typeof TeqFw_Http2_Back_Server_Handler_Api_Result} */
        const ApiResult = spec['TeqFw_Http2_Back_Server_Handler_Api#Result']; // class constructor
        const {
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_History_Remove_Request} */
            Request,
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_History_Remove_Response} */
            Response
        } = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_Remove']; // ES6 module
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Store_RDb_Schema_Weight_Stat#']; // class constructor
        /** @type {typeof Fl32_Bwl_Shared_Service_Data_Weight_History_Item} */
        const DWeightItem = spec['Fl32_Bwl_Shared_Service_Data_Weight_History_Item#']; // class constructor

        this.getRoute = function () {
            return DEF.SERV_WEIGHT_HISTORY_LIST;
        };

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Back_Server_Handler_Api_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Weight_History_List_Request}
             * @memberOf Fl32_Bwl_Back_Service_Weight_History_List
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
             * @memberOf Fl32_Bwl_Back_Service_Weight_History_List
             * @implements {TeqFw_Http2_Back_Server_Handler_Api_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS
                async function selectItems(trx, userId) {
                    const result = [];
                    const query = trx.from(EWeightStat.ENTITY);
                    query.select();
                    query.where(EWeightStat.A_USER_REF, userId);
                    query.orderBy(EWeightStat.A_DATE, 'asc');
                    /** @type {Array} */
                    const rs = await query;
                    for (const one of rs) {
                        const item = new DWeightItem();
                        item.date = formatDate(one[EWeightStat.A_DATE]);
                        item.weight = one[EWeightStat.A_VALUE];
                        result.push(item);
                    }
                    result.reverse();
                    return result;
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                result.response = new Response();
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List_Request} */
                // const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                try {
                    /** @type {Fl32_Teq_User_Shared_Api_Data_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        result.response.items = await selectItems(trx, user.id);
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
