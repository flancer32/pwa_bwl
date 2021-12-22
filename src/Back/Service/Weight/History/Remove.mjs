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
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class Fl32_Bwl_Back_Service_Weight_History_Remove {

    constructor(spec) {
        /** @type {Fl32_Bwl_Back_Defaults} */
        const DEF = spec['Fl32_Bwl_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Function|TeqFw_Core_Shared_Util.formatDate} */
        const formatDate = spec['TeqFw_Core_Shared_Util#formatDate'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_Remove#Factory$'];
        /** @type {typeof Fl32_Bwl_Shared_Enum_Weight_Type} */
        const EnumWeightType = spec['Fl32_Bwl_Shared_Enum_Weight_Type$'];
        /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const metaWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat$'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.STAT_TYPE} */
        const TYPE_WEIGHT = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#STAT_TYPE$'];

        // DEFINE WORKING VARS / PROPS
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.ATTR} */
        const A_WEIGHT_STAT = metaWeightStat.getAttributes();

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_WAPI_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Response} */
                const res = context.getOutData();
                const share = context.getHandlersShare();
                //
                const trx = await conn.startTransaction();
                try {
                    /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                    const user = share.get(DEF.MOD_USER.SHARE_USER);
                    if (user) {
                        const type = (req.type === EnumWeightType.CURRENT)
                            ? TYPE_WEIGHT.CURRENT : TYPE_WEIGHT.TARGET;
                        res.removed = await crud.deleteOne(trx, metaWeightStat, {
                            [A_WEIGHT_STAT.USER_REF]: user.id,
                            [A_WEIGHT_STAT.DATE]: formatDate(req.date),
                            [A_WEIGHT_STAT.TYPE]: type,
                        });
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
