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
    success;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Add
 */
class Factory {
    constructor() {
        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.code = data?.code;
            return res;
        }
        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.failureCause = data?.failureCause;
            res.success = data?.success ?? false;
            return res;
        }
    }
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Factory,
    Request,
    Response,
};
