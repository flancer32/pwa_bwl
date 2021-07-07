/**
 * Route data for service to remove weight stats data.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Weight_History_Remove
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Weight_History_Remove';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_History_Remove
 */
class Request {
    /** @type {Date} */
    date;
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_History_Remove
 */
class Response {
    /**
     * Number of items been removed.
     * @type {number}
     */
    removed;
}

/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_Factory_IRoute
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_History_Remove
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        const DEF = spec['Fl32_Bwl_Shared_Defaults$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_WEIGHT_HISTORY_REMOVE}`;

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.date = data?.date
                ? (data.date instanceof Date) ? data.date : new Date(data.date)
                : null;
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.removed = data?.removed ?? 0;
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
