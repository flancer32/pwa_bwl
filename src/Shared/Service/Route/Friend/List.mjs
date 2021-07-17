/**
 * Route data for service to get list of user's friends.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Friend_List
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Friend_List';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_List
 */
class Request {}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_List
 */
class Response {
    /** @type {Fl32_Bwl_Shared_Service_Dto_Friend_List_Item[]} */
    items;
}

/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_IRoute
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_List
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        const DEF = spec['Fl32_Bwl_Shared_Defaults$'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Friend_List_Item} */
        const DItem = spec['Fl32_Bwl_Shared_Service_Dto_Friend_List_Item#'];
        /** @type {Fl32_Bwl_Shared_Service_Dto_Friend_List_Item.Factory} */
        const fItem = spec['Fl32_Bwl_Shared_Service_Dto_Friend_List_Item#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_FRIEND_LIST}`;

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Friend_List.Request}
         */
        this.createReq = function (data = null) {
            return new Request();
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Friend_List.Response}
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
