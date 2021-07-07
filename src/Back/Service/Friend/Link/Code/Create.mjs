/**
 * Generate code for link to establish friendship relations.
 *
 * @namespace Fl32_Bwl_Back_Service_Friend_Link_Code_Create
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Friend_Link_Code_Create';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Friend_Link_Code_Create {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Friend_Link} */
        const DLink = spec['Fl32_Bwl_Shared_Service_Dto_Friend_Link#'];
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp.process} */
        const procCleanUp = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp$'];
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_Create.process} */
        const procCreate = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_Create$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create#Factory$'];

        // DEFINE INSTANCE METHODS

        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_IContext} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request} */
                // const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        await procCleanUp({trx});
                        const {link: code, dateExp} = await procCreate({trx, userId: user.id});
                        const link = new DLink();
                        link.code = code;
                        link.dateExpired = dateExp;
                        res.link = link;
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    result.headers[H2.HTTP2_HEADER_STATUS] = H2.HTTP_STATUS_UNAUTHORIZED;
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
