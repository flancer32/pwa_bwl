/**
 * Save weight stats data for the user.
 *
 * @namespace Fl32_Bwl_Back_Service_Weight_Stat_Save
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Weight_Stat_Save';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Weight_Stat_Save {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_Api_IConnect} */
        const rdb = spec['TeqFw_Db_Back_Api_IConnect$'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Types} */
        const Types = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Types'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Factory$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#'];
        /** @function {@type Fl32_Bwl_Back_Process_Weight_Stat_Save.process} */
        const procSave = spec['Fl32_Bwl_Back_Process_Weight_Stat_Save$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS

                async function saveWeight(trx, apiReq, userId, type) {
                    const payload = new EWeightStat();
                    payload[EWeightStat.A_TYPE] = type;
                    payload[EWeightStat.A_DATE] = apiReq.date;
                    payload[EWeightStat.A_USER_REF] = userId;
                    payload[EWeightStat.A_VALUE] = apiReq.weight;
                    await procSave({trx, payload});
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Response} */
                // const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                const trx = await rdb.startTransaction();
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        if (req.type === Types.CURRENT) {
                            await saveWeight(trx, req, user.id, EWeightStat.DATA_TYPE_CURRENT);
                        } else if (req.type === Types.TARGET) {
                            await saveWeight(trx, req, user.id, EWeightStat.DATA_TYPE_TARGET);
                        }
                    } else {
                        context.setOutHeader(DEF.MOD_WEB.HTTP_HEADER_STATUS, H2.HTTP_STATUS_UNAUTHORIZED.toString());
                    }
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
