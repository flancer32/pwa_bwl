/**
 * Route data for service to save weight stats data.
 *
 * @namespace Fl32_Bwl_Shared_WAPI_Weight_Stat_Save
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_WAPI_Weight_Stat_Save';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_WAPI_Weight_Stat_Save
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
 * @memberOf Fl32_Bwl_Shared_WAPI_Weight_Stat_Save
 */
class Response {}

/**
 * @memberOf Fl32_Bwl_Shared_WAPI_Weight_Stat_Save
 * @deprecated use TYPES
 */
class Types {}
// static properties (compatible with Safari "< 14.1", "iOS < 14.5" form)
Types.CURRENT = 'current';
Types.START = 'start';
Types.TARGET = 'target';

/**
 * @memberOf Fl32_Bwl_Shared_WAPI_Weight_Stat_Save
 */
const TYPES = {
    CURRENT: 'current',
    TARGET: 'target',
}

/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_WAPI_IRoute
 * @memberOf Fl32_Bwl_Shared_WAPI_Weight_Stat_Save
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        const DEF = spec['Fl32_Bwl_Shared_Defaults$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_WEIGHT_STAT_SAVE}`;

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_WAPI_Weight_Stat_Save.Request}
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
         * @return {Fl32_Bwl_Shared_WAPI_Weight_Stat_Save.Response}
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
Object.defineProperty(Types, 'name', {value: `${NS}.${Types.constructor.name}`});
export {
    Factory,
    Request,
    Response,
    Types,
    TYPES,
};
