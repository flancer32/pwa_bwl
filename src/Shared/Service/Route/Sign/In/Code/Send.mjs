/**
 * Route data for service to email sign in code.
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
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_IRoute
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        const DEF = spec['Fl32_Bwl_Shared_Defaults$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_SIGN_IN_CODE_SEND}`;

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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
export {
    Factory,
    Request,
    Response,
};
