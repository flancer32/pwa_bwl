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
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Factory$'];
        /** @type {Fl32_Bwl_Back_Process_Weight_Stat_Save.process|function} */
        const procSave = spec['Fl32_Bwl_Back_Process_Weight_Stat_Save$'];
        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const metaWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat$'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.TYPES} */
        const TYPE_FRONT = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#TYPES'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.STAT_TYPE} */
        const TYPE_BACK = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#STAT_TYPE$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Response} */
                // const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                const trx = await conn.startTransaction();
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        const type = (req.type === TYPE_FRONT.TARGET) ? TYPE_BACK.TARGET : TYPE_BACK.CURRENT;
                        // noinspection JSValidateTypes
                        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.Dto} */
                        const payload = metaWeightStat.createDto();
                        payload.user_ref = user.id;
                        payload.date = req.date;
                        payload.type = type;
                        payload.value = req.weight;
                        await procSave({trx, payload});
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
