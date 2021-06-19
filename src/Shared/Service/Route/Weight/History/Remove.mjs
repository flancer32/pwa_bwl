/**
 * Request and response for 'Remove Weight Stats Data' service.
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
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_History_Remove
 */
class Factory {
    constructor() {
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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Factory,
    Request,
    Response,
};
