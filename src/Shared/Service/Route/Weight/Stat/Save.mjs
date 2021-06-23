/**
 * Request and response for 'Save Weight Stats Data' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save
 */
class Request {
    /** @type {Date} */
    date;
    /** @type {string} @see Types */
    type;
    /** @type {number} */
    weight;
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save
 */
class Response {
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save
 */
class Types {}

// static properties (compatible with Safari "< 14.1", "iOS < 14.5" form)
Types.CURRENT = 'current';
Types.START = 'start';
Types.TARGET = 'target';


/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save
 */
class Factory {
    constructor() {
        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.date = data?.date
                ? (data.date instanceof Date) ? data.date : new Date(data.date)
                : null;
            res.type = data?.type;
            res.weight = data?.weight;
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            return res;
        }
    }
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
Object.defineProperty(Types, 'name', {value: `${NS}.${Types.name}`});
export {
    Factory,
    Request,
    Response,
    Types,
};
