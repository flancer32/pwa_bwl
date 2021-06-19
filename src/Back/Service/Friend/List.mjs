/**
 * Service to get list of user's friends.
 *
 * @namespace Fl32_Bwl_Back_Service_Friend_List
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Friend_List';

/**
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Bwl_Back_Service_Friend_List {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        const {
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_List.Request} */
            Request,
            /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_List.Response} */
            Response
        } = spec['Fl32_Bwl_Shared_Service_Route_Friend_List']; // ES6 module
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Friend_List_Item} */
        const DItem = spec['Fl32_Bwl_Shared_Service_Dto_Friend_List_Item#']; // class
        /** @function {@type Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems.queryBuilder} */
        const qGetItems = spec['Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems$']; // function singleton

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_FRIEND_LIST;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {function(TeqFw_Http2_Back_Server_Stream_Context): Fl32_Bwl_Shared_Service_Route_Friend_List.Request}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Friend_List.Request}
             * @memberOf Fl32_Bwl_Back_Service_Friend_List
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
             * @memberOf Fl32_Bwl_Back_Service_Friend_List
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS

                /**
                 * Get data from DB and compose array with Service Data.
                 * @param trx
                 * @param {number} userId
                 * @return {Promise<*[]>}
                 */
                async function getItems(trx, userId) {
                    const result = [];
                    const query = qGetItems({trx, userId});
                    const rs = await query;
                    for (const one of rs) {
                        const item = new DItem();
                        if (one[qGetItems.A_LEADER_ID] === userId) {
                            // add wingman as a friend
                            item.friendId = one[qGetItems.A_WINGMAN_ID];
                            item.friendName = one[qGetItems.A_WINGMAN_NAME];
                        } else {
                            // add leader as a friend
                            item.friendId = one[qGetItems.A_LEADER_ID];
                            item.friendName = one[qGetItems.A_LEADER_NAME];
                        }
                        item.dateStarted = one[qGetItems.A_DATE_STARTED];
                        result.push(item);
                    }
                    return result;
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = new Response();
                result.response = response;
                // /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Request} */
                // const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        response.items = await getItems(trx, user.id);
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

export default Fl32_Bwl_Back_Service_Friend_List;
