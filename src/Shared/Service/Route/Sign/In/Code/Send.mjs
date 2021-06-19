/**
 * Request and response for 'Email Sign In Code' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send
 */
class Request {
    /** @type {string} */
    email;
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send
 */
class Response {
    /** @type {boolean} */
    isSent;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send
 */
class Factory {
    constructor() {
        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.email = data?.email;
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.isSent = data?.isSent ?? false;
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
