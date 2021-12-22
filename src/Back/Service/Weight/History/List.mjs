/**
 * Get weight stats data for the user.
 *
 * @namespace Fl32_Bwl_Back_Service_Weight_History_List
 */
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Weight_History_List';

/**
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class Fl32_Bwl_Back_Service_Weight_History_List {

    constructor(spec) {
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {TeqFw_Core_Shared_Util.formatDate|function} */
        const formatDate = spec['TeqFw_Core_Shared_Util#formatDate'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Weight_History_Item} */
        const DWeightItem = spec['Fl32_Bwl_Shared_Service_Dto_Weight_History_Item#'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems.queryBuilder|function} */
        const qHistoryGetItems = spec['Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Factory$'];
        /** @type {typeof Fl32_Bwl_Shared_Enum_Weight_Type} */
        const EnumWeightType = spec['Fl32_Bwl_Shared_Enum_Weight_Type$'];
        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const metaWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.STAT_TYPE} */
        const TYPE_WEIGHT = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#STAT_TYPE$'];

        // DEFINE WORKING VARS / PROPS
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.ATTR} */
        const A_WEIGHT_STAT = metaWeightStat.getAttributes();

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_WAPI_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS

                /**
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
                 * @param {Fl32_Teq_User_Shared_Service_Dto_User} user
                 * @param {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Request} apiReq
                 * @return {Promise<*[]>}
                 */
                async function selectItems(trx, user, apiReq) {
                    // DEFINE INNER FUNCTIONS

                    /**
                     * @param {TeqFw_Db_Back_RDb_ITrans} trx
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
                        const where = (build) => {
                            build.where(A_WEIGHT_STAT.USER_REF, userId);
                            if (apiReq.dateFrom) build.where(A_WEIGHT_STAT.DATE, '>=', formatDate(apiReq.dateFrom));
                            if (apiReq.dateTo) build.where(A_WEIGHT_STAT.DATE, '<=', formatDate(apiReq.dateTo));
                            let type = (apiReq.type) && apiReq.type === EnumWeightType.TARGET
                                ? TYPE_WEIGHT.TARGET : TYPE_WEIGHT.CURRENT;
                            build.where(A_WEIGHT_STAT.TYPE, type);
                        };
                        const column = [A_WEIGHT_STAT.DATE];
                        const order = (apiReq.order === 'desc') ? 'desc' : 'asc'
                        const orderBy = [{column, order}];
                        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.Dto[]} */
                        const rs = await crud.readSet(trx, metaWeightStat, where, null, orderBy);
                        for (const one of rs) {
                            const item = new DWeightItem();
                            item.date = formatDate(one.date);
                            item.weight = one.value;
                            result.push(item);
                        }
                    }
                    return result;
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Response} */
                const res = context.getOutData();
                const share = context.getHandlersShare();
                //
                const trx = await conn.startTransaction();
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = share.get(DEF.MOD_USER.SHARE_USER);
                    if (user) {
                        res.items = await selectItems(trx, user, req);
                    } else {
                        share.set(DEF.MOD_WEB.SHARE_RES_STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
                    }
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
