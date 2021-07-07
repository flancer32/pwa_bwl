/**
 * Route data for service to establish friendship relations using generated code.
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
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_Factory_IRoute
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Add
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        const DEF = spec['Fl32_Bwl_Shared_Defaults$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_FRIEND_LINK_ADD}`;

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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
export {
    Factory,
    Request,
    Response,
};
