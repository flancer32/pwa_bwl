/**
 * Request and response for demo service to develop new format services.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Demo
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Demo';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Demo
 */
class Request {
    /** @type {string} */
    lang;
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Demo
 */
class Response {
    /** @type {boolean} */
    success;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Demo
 * @implements TeqFw_Web_Back_Api_Service_Factory_IRoute
 */
class Factory {
    constructor() {
        /**
         * @param {Request|Object|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Demo.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.lang = data?.lang;
            return res;
        }

        /**
         * @param {Response|Object|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Demo.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.success = data?.success || false;
            return res;
        }

        this.getRoute = () => '/demo';

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
