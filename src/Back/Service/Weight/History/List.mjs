/**
 * Service to get weight stats data for the user.
 *
 * @namespace Fl32_Bwl_Back_Service_Weight_History_List
 */
import {constants as H2} from 'http2';

/**
 * Service to get weight stats data for the user.
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
export default class Fl32_Bwl_Back_Service_Weight_History_List {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        const {
            /** @function {@type TeqFw_Core_App_Shared_Util.formatDate} */
            formatDate
        } = spec['TeqFw_Core_App_Shared_Util']; // ES6 module
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Factory} */
        const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Factory$']; // singleton
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#']; // class
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Weight_History_Item} */
        const DWeightItem = spec['Fl32_Bwl_Shared_Service_Dto_Weight_History_Item#']; // class
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems.queryBuilder} */
        const qHistoryGetItems = spec['Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems$'];


        this.getRoute = function () {
            return DEF.SERV_WEIGHT_HISTORY_LIST;
        };

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Api_Back_Service_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Request}
             * @memberOf Fl32_Bwl_Back_Service_Weight_History_List
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
             * @memberOf Fl32_Bwl_Back_Service_Weight_History_List
             * @implements {TeqFw_Http2_Api_Back_Service_Factory.service}
             */
            async function service(apiCtx) {

                // DEFINE INNER FUNCTIONS
                /**
                 * @param trx
                 * @param {Fl32_Teq_User_Shared_Service_Dto_User} user
                 * @param {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Request} apiReq
                 * @return {Promise<*[]>}
                 */
                async function selectItems(trx, user, apiReq) {
                    // DEFINE INNER FUNCTIONS

                    /**
                     * @param trx
                     * @param {number} userId
                     * @param {number} friendId
                     * @return {Promise<boolean>}
                     */
                    async function isValidFriend(trx, userId, friendId) {
                        let result = false;
                        const query = qHistoryGetItems({trx, userId}); // get all friends for the user
                        const rs = await query;
                        for (const one of rs) {
                            const leaderId = one[qHistoryGetItems.A_LEADER_ID];
                            const wingmanId = one[qHistoryGetItems.A_WINGMAN_ID];
                            if ((friendId === leaderId) || (friendId === wingmanId)) {
                                result = true;
                                break;
                            }
                        }
                        return result;
                    }

                    // MAIN FUNCTIONALITY
                    const result = [];
                    let userId = user.id; // use current user by default to get weight history
                    if (apiReq.friendId) {
                        const isValid = await isValidFriend(trx, user.id, apiReq.friendId);
                        if (isValid) {
                            userId = apiReq.friendId;
                        } else {
                            userId = null;
                        }
                    }
                    if (userId) {
                        const query = trx.from(EWeightStat.ENTITY);
                        query.select();
                        query.where(EWeightStat.A_USER_REF, userId);
                        if (apiReq.dateFrom) query.where(EWeightStat.A_DATE, '>=', formatDate(apiReq.dateFrom));
                        if (apiReq.dateTo) query.where(EWeightStat.A_DATE, '<=', formatDate(apiReq.dateTo));
                        if (apiReq.order === 'asc') query.orderBy(EWeightStat.A_DATE, 'asc');
                        if (apiReq.order === 'desc') query.orderBy(EWeightStat.A_DATE, 'desc');
                        /** @type {Array} */
                        const rs = await query;
                        for (const one of rs) {
                            const item = new DWeightItem();
                            item.date = formatDate(one[EWeightStat.A_DATE]);
                            item.weight = one[EWeightStat.A_VALUE];
                            result.push(item);
                        }
                    }
                    return result;
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = factRoute.createRes();
                result.response = response;
                const trx = await rdb.startTransaction();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                       response.items = await selectItems(trx, user, apiReq);
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
