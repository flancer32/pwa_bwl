/**
 * Service to establish friendship relations using generated code.
 *
 * @namespace Fl32_Bwl_Back_WAPI_Friend_Link_Add
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_WAPI_Friend_Link_Add';

/**
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class Fl32_Bwl_Back_WAPI_Friend_Link_Add {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {Fl32_Bwl_Shared_WAPI_Friend_Link_Add.Factory} */
        const route = spec['Fl32_Bwl_Shared_WAPI_Friend_Link_Add#Factory$'];
        /** @type {Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp.process|function} */
        const procCleanUp = spec['Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp$'];
        /** @type {Fl32_Bwl_Back_Act_Friend_Link_Code_Get.process|function} */
        const procGet = spec['Fl32_Bwl_Back_Act_Friend_Link_Code_Get$'];
        /** @type {Fl32_Bwl_Back_Act_Friend_Link_Add.process|function} */
        const procAdd = spec['Fl32_Bwl_Back_Act_Friend_Link_Add$'];
        /** @type {Fl32_Bwl_Back_Act_Friend_Link_Code_Remove.process|function} */
        const procRemove = spec['Fl32_Bwl_Back_Act_Friend_Link_Code_Remove$'];

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
                /** @type {Fl32_Bwl_Shared_WAPI_Friend_Link_Add.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_WAPI_Friend_Link_Add.Response} */
                const res = context.getOutData();
                const share = context.getHandlersShare();
                //
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = share.get(DEF.MOD_USER.SHARE_USER);
                if (user) {
                    const trx = await rdb.startTransaction();
                    try {
                        await procCleanUp({trx});
                        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link.Dto} */
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
                    context.setOutHeader(DEF.MOD_WEB.HTTP_HEADER_STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
