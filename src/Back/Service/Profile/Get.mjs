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
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Factory$'];
        /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Profile} */
        const DProfile = spec['Fl32_Bwl_Shared_Service_Dto_Profile#'];
        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const metaWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat$'];
        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
        const metaAppProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.STAT_TYPE} */
        const TYPE_WEIGHT = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#STAT_TYPE$'];

        // DEFINE WORKING VARS / PROPS
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.ATTR} */
        const A_WEIGHT_STAT = metaWeightStat.getAttributes();
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile.ATTR} */
        const A_APP_PROFILE = metaAppProfile.getAttributes();

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

                /**
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
                 * @param {number} userId
                 * @returns {Promise<Fl32_Bwl_Shared_Service_Dto_Profile>} UI compatible DTO
                 */
                async function selectProfile(trx, userId) {
                    const res = new DProfile();
                    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Profile.Dto} */
                    const found = await crud.readOne(trx, metaAppProfile, {[A_APP_PROFILE.USER_REF]: userId});
                    if (found) {
                        res.age = found.age;
                        res.dateUpdated = found.date_updated;
                        res.height = found.height;
                        res.isFemale = found.is_female;
                        res.userId = found.user_ref;
                    }
                    return res;
                }

                /**
                 * Get the last current/target weight from stats.
                 * @param {TeqFw_Db_Back_RDb_ITrans} trx
                 * @param {number} userId
                 * @param {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.STAT_TYPE} type
                 * @return {Promise<number>}
                 */
                async function selectCurrentWeight(trx, userId, type) {
                    let res = 0;
                    const where = {
                        [A_WEIGHT_STAT.USER_REF]: userId,
                        [A_WEIGHT_STAT.TYPE]: type,
                    };
                    const order = {[A_WEIGHT_STAT.DATE]: 'desc'};
                    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.Dto[]} */
                    const found = await crud.readSet(trx, metaWeightStat, where, null, order, 1);
                    if (found.length === 1) res = found[0].value;
                    return res;
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Request} */
                // const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                const trx = await conn.startTransaction();
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        res.profile = await selectProfile(trx, user.id);
                        res.profile.weightCurrent = await selectCurrentWeight(trx, user.id, TYPE_WEIGHT.CURRENT);
                        res.profile.weightTarget = await selectCurrentWeight(trx, user.id, TYPE_WEIGHT.TARGET);
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
