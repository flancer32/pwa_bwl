/**
 * Request and response for 'Sign Up' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Sign_Up
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Sign_Up';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_Up
 */
class Request {
    /** @type {number} */
    age;
    /** @type {string} */
    email;
    /** @type {number} */
    height;
    /** @type {boolean} */
    isFemale;
    /** @type {string} */
    name;
    /** @type {string} */
    phone;
    /** @type {string} */
    refCode;
    /** @type {number} */
    weight;
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_Up
 */
class Response {
    /** @type {string} */
    sessionId;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Sign_Up
 */
class Factory {
    constructor() {
        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.age = data?.age;
            res.email = data?.email;
            res.height = data?.height;
            res.isFemale = data?.isFemale ?? false;
            res.name = data?.name;
            res.phone = data?.phone;
            res.refCode = data?.refCode;
            res.weight = data?.weight;
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Sign_Up.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.sessionId = data?.sessionId;
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
