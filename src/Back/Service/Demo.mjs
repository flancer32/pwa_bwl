/**
 * Demo service to develop HTTP Service Handler.
 *
 * @namespace Fl32_Bwl_Back_Service_Demo
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Demo';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Demo {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Service_Route_Demo.Factory} */
        const fRouteDto = spec['Fl32_Bwl_Shared_Service_Route_Demo#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getDtoFactory = () => fRouteDto;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             *
             * @param {TeqFw_Web_Back_Api_Service_IContext} context
             */
            async function service(context) {
                /** @type {TeqFw_Web_Back_Api_Service_IContext} : IDEA suggestions failure */
                const ctx = context;
                const out = ctx.getOutData();
                out.success = true;
                ctx.setOutHeader(H2.HTTP2_HEADER_ACCEPT_CHARSET, 'utf8');
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }

}
