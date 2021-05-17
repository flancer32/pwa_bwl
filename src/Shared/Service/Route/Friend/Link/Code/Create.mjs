/**
 * Request and response for service to generate code for link to establish friendship relations.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create
 */
class Request {
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create
 */
class Response {
    /** @type {Fl32_Bwl_Shared_Service_Data_Friend_Link} */
    link;
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Request,
    Response,
};
