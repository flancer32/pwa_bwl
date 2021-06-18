/**
 * Request and response for service to generate code for link to establish friendship relations.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Friend_Link_Add
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Friend_Link_Add';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Add
 */
class Request {
    /** @type {string} */
    code;
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Add
 */
class Response {
    /**
     * Cause of the failure if error is occurred.
     * @type {string}
     */
    failureCause;
    /** @type {boolean} */
    success = false;
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Request,
    Response,
};
