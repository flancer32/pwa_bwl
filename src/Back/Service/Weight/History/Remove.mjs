/**
 * Remove weight stats data for the user.
 *
 * @namespace Fl32_Bwl_Back_Service_Weight_History_Remove
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Weight_History_Remove';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Weight_History_Remove {

    constructor(spec) {
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_Api_IConnect} */
        const rdb = spec['TeqFw_Db_Back_Api_IConnect$'];
        /** @type {Function|TeqFw_Core_Shared_Util.formatDate} */
        const formatDate = spec['TeqFw_Core_Shared_Util#formatDate'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_Remove#Factory$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#'];
        /** @type {typeof Fl32_Bwl_Shared_Enum_Weight_Type} */
        const EnumWeightType = spec['Fl32_Bwl_Shared_Enum_Weight_Type$'];

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

                async function removeItems(trx, userId, date, type) {
                    const query = trx.from(EWeightStat.ENTITY)
                        .where(EWeightStat.A_USER_REF, userId)
                        .where(EWeightStat.A_DATE, formatDate(date))
                        .where(EWeightStat.A_TYPE, type);
                    return await query.del();
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                const trx = await rdb.startTransaction();
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        const type = (req.type === EnumWeightType.CURRENT)
                            ? EWeightStat.DATA_TYPE_CURRENT : EWeightStat.DATA_TYPE_TARGET;
                        res.removed = await removeItems(trx, user.id, req.date, type);
                    } else {
                        context.setOutHeader(DEF.MOD_WEB.HTTP_HEADER_STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
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
