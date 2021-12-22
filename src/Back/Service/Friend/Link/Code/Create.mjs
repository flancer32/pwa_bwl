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
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class Fl32_Bwl_Back_Service_Friend_Link_Code_Create {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Friend_Link} */
        const DLink = spec['Fl32_Bwl_Shared_Service_Dto_Friend_Link#'];
        /** @type {Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp.process|function} */
        const procCleanUp = spec['Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp$'];
        /** @type {Fl32_Bwl_Back_Act_Friend_Link_Code_Create.process|function} */
        const procCreate = spec['Fl32_Bwl_Back_Act_Friend_Link_Code_Create$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create#Factory$'];

        // DEFINE INSTANCE METHODS

        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_WAPI_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request} */
                // const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Response} */
                const res = context.getOutData();
                const share = context.getHandlersShare();
                //
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = share.get(DEF.MOD_USER.SHARE_USER);
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
