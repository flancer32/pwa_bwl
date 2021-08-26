/**
 * Get list of user's friends.
 *
 * @namespace Fl32_Bwl_Back_Service_Friend_List
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Friend_List';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Friend_List {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_Api_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_Api_RDb_IConnect$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Friend_List.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Friend_List#Factory$'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Friend_List_Item} */
        const DItem = spec['Fl32_Bwl_Shared_Service_Dto_Friend_List_Item#'];
        /** @function {@type Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems.queryBuilder} */
        const qGetItems = spec['Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems$'];

        // DEFINE INSTANCE METHODS

        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_Context} context
             * @return Promise<void>
             */
            async function service(context) {
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
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_List.Request} */
                // const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_List.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        res.items = await getItems(trx, user.id);
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    context.setOutHeader(DEF.MOD_WEB.HTTP_HEADER_STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
