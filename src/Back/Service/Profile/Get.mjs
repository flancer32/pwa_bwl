import {constants as H2} from 'http2';

/**
 * Service to get application profile for the user.
 * @implements TeqFw_Http2_Api_Service_Factory
 */
export default class Fl32_Bwl_Back_Service_Profile_Get {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        const {
            /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get_Request} */
            Request,
            /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get_Response} */
            Response
        } = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get']; // ES6 module
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile#']; // class
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Store_RDb_Schema_Weight_Stat#']; // class
        /** @type {typeof Fl32_Bwl_Shared_Service_Data_Profile} */
        const DProfile = spec['Fl32_Bwl_Shared_Service_Data_Profile#']; // class

        this.getRoute = function () {
            return DEF.SERV_PROFILE_GET;
        };

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Api_Service_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Profile_Get_Request}
             * @memberOf Fl32_Bwl_Back_Service_Profile_Get
             * @implements TeqFw_Http2_Api_Service_Factory.parse
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                return Object.assign(new Request(), body.data); // clone HTTP body into API request object
            }

            // COMPOSE RESULT
            Object.defineProperty(parse, 'name', {value: `${this.constructor.name}.${parse.name}`});
            return parse;
        };

        /**
         * Factory to create service (handler to process HTTP API request).
         * @returns {TeqFw_Http2_Api_Service_Factory.service}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Handler_Api.Context} apiCtx
             * @returns {Promise<TeqFw_Http2_Plugin_Handler_Service.Result>}
             * @memberOf Fl32_Bwl_Back_Service_Profile_Get
             * @implements {TeqFw_Http2_Api_Service_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS
                /**
                 * @param trx
                 * @param {Number} userId
                 * @returns {Promise<Fl32_Bwl_Shared_Service_Data_Profile>}
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
                        [DProfile.WEIGHT_START]: EProfile.A_WEIGHT_INIT,
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
                const result = new ApiResult();
                /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get_Response} */
                const response = new Response();
                const trx = await rdb.startTransaction();
                // /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get_Request} */
                // const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                try {
                    /** @type {Fl32_Teq_User_Shared_Api_Data_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        response.profile = await selectProfile(trx, user.id);
                        response.profile.weightCurrent = await selectCurrentWeight(trx, user.id);
                    } else {
                        result.headers[H2.HTTP2_HEADER_STATUS] = H2.HTTP_STATUS_UNAUTHORIZED;
                    }
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
                result.response = response;
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(service, 'name', {value: `${this.constructor.name}.${service.name}`});
            return service;
        };
    }

}
