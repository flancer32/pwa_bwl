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
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];
        /** @type {Function|TeqFw_Core_Shared_Util.formatDate} */
        const formatDate = spec['TeqFw_Core_Shared_Util#formatDate'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_Remove#Factory$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#'];

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

                async function removeItems(trx, userId, date) {
                    const query = trx.from(EWeightStat.ENTITY)
                        .where(EWeightStat.A_USER_REF, userId)
                        .where(EWeightStat.A_DATE, formatDate(date));
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
                        res.removed = await removeItems(trx, user.id, req.date);
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
