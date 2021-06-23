/**
 * Request and response for 'Get application profile for the user' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Profile_Get
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Profile_Get';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Profile_Get
 */
class Request {
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Profile_Get
 */
class Response {
    /** @type {Fl32_Bwl_Shared_Service_Dto_Profile} */
    profile;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Profile_Get
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Profile} */
        const DProfile = spec['Fl32_Bwl_Shared_Service_Dto_Profile#']; // class
        /** @type {Fl32_Bwl_Shared_Service_Dto_Profile.Factory} */
        const fProfile = spec['Fl32_Bwl_Shared_Service_Dto_Profile#Factory$']; // singleton

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Profile_Get.Request}
         */
        this.createReq = function (data = null) {
            return new Request();
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Profile_Get.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.profile = (data?.profile instanceof DProfile) ? data.profile : fProfile.create(data?.profile);
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
