/**
 * Route data for service to sign in code check.
 *
 * @namespace Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check
 */
class Request {
    /** @type {string} */
    code;
}

/**
 * @memberOf Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check
 */
class Response {
    /** @type {string} */
    sessionId;
}


/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_WAPI_IRoute
 * @memberOf Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        const DEF = spec['Fl32_Bwl_Shared_Defaults$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_SIGN_IN_CODE_CHECK}`;

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.code = data?.code;
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_WAPI_Sign_In_Code_Check.Response}
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
