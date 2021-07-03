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
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];
        /** @type {Function|TeqFw_Core_Shared_Util.formatDateTime} */
        const formatDateTime = spec['TeqFw_Core_Shared_Util#formatDateTime'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Types} */
        const Types = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Types'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Factory$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#'];
        /** @function {@type Fl32_Bwl_Back_Process_Weight_Stat_Save.process} */
        const procSave = spec['Fl32_Bwl_Back_Process_Weight_Stat_Save$'];

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

                async function saveCurrent(trx, apiReq, user) {
                    const payload = new EWeightStat();
                    payload[EWeightStat.A_DATE] = apiReq.date;
                    payload[EWeightStat.A_USER_REF] = user.id;
                    payload[EWeightStat.A_VALUE] = apiReq.weight;
                    await procSave({trx, payload});
                }

                async function saveToProfile(trx, userId, weight, type, date) {
                    const input = {[EProfile.A_DATE_UPDATED]: date};
                    if (type === Types.TARGET) {
                        input[EProfile.A_WEIGHT_TARGET] = weight;
                    }
                    await trx(EProfile.ENTITY)
                        .update(input)
                        .where(EProfile.A_USER_REF, userId);
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                const trx = await rdb.startTransaction();
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = shared[DEF.MOD.USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        if (req.type === Types.CURRENT) {
                            await saveCurrent(trx, req, user);
                        } else {
                            const date = formatDateTime(req.date);
                            await saveToProfile(trx, user.id, req.weight, req.type, date);
                        }

                    } else {
                        context.setOutHeader(DEF.MOD.WEB.HTTP.HEADER.STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
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
