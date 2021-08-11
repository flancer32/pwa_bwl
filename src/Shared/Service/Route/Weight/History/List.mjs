/**
 * Route data for service to list weight stats data.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Weight_History_List
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Weight_History_List';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_History_List
 */
class Request {
    /** @type {Date} */
    dateFrom;
    /** @type {Date} */
    dateTo;
    /** @type {number} */
    friendId;
    /** @type {string} 'asc' or 'desc'*/
    order;
    /** @type {Fl32_Bwl_Shared_Enum_Weight_Type} */
    type;
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_History_List
 */
class Response {
    /** @type {Fl32_Bwl_Shared_Service_Dto_Weight_History_Item[]} */
    items;
}

/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_IRoute
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_History_List
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        const DEF = spec['Fl32_Bwl_Shared_Defaults$'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Weight_History_Item} */
        const DItem = spec['Fl32_Bwl_Shared_Service_Dto_Weight_History_Item#'];
        /** @type {Fl32_Bwl_Shared_Service_Dto_Weight_History_Item.Factory} */
        const fItem = spec['Fl32_Bwl_Shared_Service_Dto_Weight_History_Item#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_WEIGHT_HISTORY_LIST}`;

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.dateFrom = data?.dateFrom
                ? (data.dateFrom instanceof Date) ? data.dateFrom : new Date(data.dateFrom)
                : null;
            res.dateTo = data?.dateTo
                ? (data.dateTo instanceof Date) ? data.dateTo : new Date(data.dateTo)
                : null;
            res.friendId = data?.friendId;
            res.order = data?.order;
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.items = Array.isArray(data?.items)
                ? data.items.map((one) => (one instanceof DItem) ? one : fItem.create(one))
                : [];
            return res;
        }
    }
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
export {
    Factory,
    Request,
    Response,
};
