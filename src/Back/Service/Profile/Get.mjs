/**
 * Get application profile for the user.
 *
 * @namespace Fl32_Bwl_Back_Service_Profile_Get
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Profile_Get';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Bwl_Back_Service_Profile_Get {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Factory$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Profile} */
        const DProfile = spec['Fl32_Bwl_Shared_Service_Dto_Profile#'];

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

                /**
                 * @param trx
                 * @param {Number} userId
                 * @returns {Promise<Fl32_Bwl_Shared_Service_Dto_Profile>}
                 */
                async function selectProfile(trx, userId) {
                    const result = new DProfile();
                    const query = trx.from(EProfile.ENTITY);
                    query.select({
                        [DProfile.AGE]: EProfile.A_AGE,
                        [DProfile.DATE_UPDATED]: EProfile.A_DATE_UPDATED,
                        [DProfile.HEIGHT]: EProfile.A_HEIGHT,
                        [DProfile.IS_FEMALE]: EProfile.A_IS_FEMALE,
                        [DProfile.USER_ID]: EProfile.A_USER_REF,
                        [DProfile.WEIGHT_TARGET]: EProfile.A_WEIGHT_TARGET,
                    });
                    query.where(EProfile.A_USER_REF, userId);
                    /** @type {Array} */
                    const rs = await query;
                    if (rs.length === 1) {
                        const [first] = rs;
                        Object.assign(result, first);
                    }
                    return result;
                }

                async function selectCurrentWeight(trx, userId) {
                    let result = 0;
                    const query = trx.from(EWeightStat.ENTITY);
                    query.select();
                    query.where(EWeightStat.A_USER_REF, userId);
                    query.orderBy(EWeightStat.A_DATE, 'desc');
                    query.limit(1);
                    /** @type {Array} */
                    const rs = await query;
                    if (rs.length === 1) {
                        const [first] = rs;
                        result = first[EWeightStat.A_VALUE];
                    }
                    return result;
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                const trx = await rdb.startTransaction();
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        res.profile = await selectProfile(trx, user.id);
                        res.profile.weightCurrent = await selectCurrentWeight(trx, user.id);
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
