/**
 * Request and response for service to get list of user's friends.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Friend_List
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Friend_List';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_List
 */
class Request {
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_List
 */
class Response {
    /** @type {Fl32_Bwl_Shared_Service_Data_Friend_List_Item[]} */
    items;
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Request,
    Response,
};
