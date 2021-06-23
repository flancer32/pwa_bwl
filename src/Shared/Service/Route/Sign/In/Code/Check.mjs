/**
 * Request and response for 'Sign In Code Check' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check
 */
class Request {
    /** @type {string} */
    code;
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check
 */
class Response {
    /** @type {string} */
    sessionId;
}


/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check
 */
class Factory {
    constructor() {

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.code = data?.code;
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.sessionId = data?.sessionId;
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
