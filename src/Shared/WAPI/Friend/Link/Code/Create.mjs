/**
 * Route data for service to generate code for link to establish friendship relations.
 *
 * @namespace Fl32_Bwl_Shared_WAPI_Friend_Link_Code_Create
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_WAPI_Friend_Link_Code_Create';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Shared_WAPI_Friend_Link_Code_Create
 */
class Request {}

/**
 * @memberOf Fl32_Bwl_Shared_WAPI_Friend_Link_Code_Create
 */
class Response {
    /** @type {Fl32_Bwl_Shared_Dto_Friend_Link} */
    link;
}

/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_WAPI_IRoute
 * @memberOf Fl32_Bwl_Shared_WAPI_Friend_Link_Code_Create
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        const DEF = spec['Fl32_Bwl_Shared_Defaults$'];
        /** @type {typeof Fl32_Bwl_Shared_Dto_Friend_Link} */
        const DLink = spec['Fl32_Bwl_Shared_Dto_Friend_Link#'];
        /** @type {Fl32_Bwl_Shared_Dto_Friend_Link.Factory} */
        const fLink = spec['Fl32_Bwl_Shared_Dto_Friend_Link#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_FRIEND_LINK_CODE_CREATE}`;

        /**
         * @param {Request|null} data
         * @return {Fl32_Bwl_Shared_WAPI_Friend_Link_Code_Create.Request}
         */
        this.createReq = function (data = null) {
            return new Request();
        }
        /**
         * @param {Response|null} data
         * @return {Fl32_Bwl_Shared_WAPI_Friend_Link_Code_Create.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.link = (data?.link instanceof DLink) ? data.link : fLink.create(data?.link);
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
