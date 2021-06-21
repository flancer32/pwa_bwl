/**
 * Request and response for service to generate code for link to establish friendship relations.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create
 */
class Request {
}

/**
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create
 */
class Response {
    /** @type {Fl32_Bwl_Shared_Service_Dto_Friend_Link} */
    link;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Friend_Link} */
        const DLink = spec['Fl32_Bwl_Shared_Service_Dto_Friend_Link#']; // class
        /** @type {Fl32_Bwl_Shared_Service_Dto_Friend_Link.Factory} */
        const fLink = spec['Fl32_Bwl_Shared_Service_Dto_Friend_Link#Factory$']; // singleton

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request}
         */
        this.createReq = function (data = null) {
            return new Request();
        }
        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.link = (data?.link instanceof DLink) ? data.link : fLink.create(data?.link);
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
