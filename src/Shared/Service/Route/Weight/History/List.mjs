/**
 * Request and response for 'List Weight Stats Data' service.
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
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_History_List
 */
class Response {
    /** @type {Fl32_Bwl_Shared_Service_Data_Weight_History_Item[]} */
    items;
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Request,
    Response,
};
