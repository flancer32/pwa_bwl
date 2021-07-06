/**
 * Service to establish friendship relations using generated code.
 *
 * @namespace Fl32_Bwl_Back_Service_Friend_Link_Add
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Friend_Link_Add';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Friend_Link_Add {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];
        /** @type {TeqFw_Core_Logger} */
        const logger = spec['TeqFw_Core_Logger$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Add#Factory$'];
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp.process} */
        const procCleanUp = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp$'];
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_Get.process } */
        const procGet = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_Get$'];
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Add.process } */
        const procAdd = spec['Fl32_Bwl_Back_Process_Friend_Link_Add$'];
        /** @function {@type Fl32_Bwl_Back_Process_Friend_Link_Code_Remove.process} */
        const procRemove = spec['Fl32_Bwl_Back_Process_Friend_Link_Code_Remove$'];

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
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = shared[DEF.MOD.USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    const trx = await rdb.startTransaction();
                    try {
                        await procCleanUp({trx});
                        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
                        const link = await procGet({trx, code: req.code});
                        if (link) {
                            if (link.leader_ref !== user.id) {
                                await procAdd({trx, leaderId: link.leader_ref, wingmanId: user.id});
                                res.success = true;
                            } else {
                                const msg = `Cannot link user for himself. User ID: ${user.id}, code: ${req.code}.`;
                                logger.error(msg);
                                res.failureCause = msg;
                            }
                            await procRemove({trx, code: req.code});
                        } else {
                            const msg = `Cannot find friendship link with code '${req.code}'.`;
                            logger.error(msg);
                            res.failureCause = msg;
                        }
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    context.setOutHeader(DEF.MOD.WEB.HTTP.HEADER.STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
