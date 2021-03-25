/**
 * ervice to get weight stats data for the user.
 *
 * @namespace Fl32_Bwl_Back_Service_Group_List
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S CLASSES
/**
 * Data object for group member (internal for this ES6 module).
 * @memberOf Fl32_Bwl_Back_Service_Group_List
 */
class DMember {
    static GROUP_ID = 'groupId';
    static USER_ID = 'userId';
    static USER_NAME = 'userName';
    groupId;
    userId;
    userName;
}

// MODULE'S EXPORT
/**
 * Service to get weight stats data for the user.
 * @extends TeqFw_Http2_Back_Server_Handler_Api_Factory
 */
export default class Fl32_Bwl_Back_Service_Group_List {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        const {
            /** @type {TeqFw_Core_App_Shared_Util.formatDate} */
            formatDate
        } = spec['TeqFw_Core_App_Shared_Util']; // ES6 module
        /** @type {typeof TeqFw_Http2_Back_Server_Handler_Api_Result} */
        const ApiResult = spec['TeqFw_Http2_Back_Server_Handler_Api#Result']; // class constructor
        const {
            /** @type {Fl32_Bwl_Shared_Service_Route_Group_List_Request} */
            Request,
            /** @type {Fl32_Bwl_Shared_Service_Route_Group_List_Response} */
            Response
        } = spec['Fl32_Bwl_Shared_Service_Route_Group_List']; // ES6 module
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Group_User} */
        const EGroupUser = spec['Fl32_Bwl_Store_RDb_Schema_Group_User#']; // class constructor
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Group} */
        const EGroup = spec['Fl32_Bwl_Store_RDb_Schema_Group#']; // class constructor
        /** @type {Fl32_Teq_User_Store_RDb_Schema_Profile} */
        const eProfile = spec['Fl32_Teq_User_Store_RDb_Schema_Profile$']; // instance singleton
        /** @type {typeof Fl32_Bwl_Shared_Service_Data_Group_Item} */
        const DGroupItem = spec['Fl32_Bwl_Shared_Service_Data_Group_Item#']; // class constructor

        this.getRoute = function () {
            return DEF.SERV_GROUP_LIST;
        };

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {TeqFw_Http2_Back_Server_Handler_Api_Factory.parse}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Bwl_Shared_Service_Route_Group_List_Request}
             * @memberOf Fl32_Bwl_Back_Service_Group_List
             * @implements TeqFw_Http2_Back_Server_Handler_Api_Factory.parse
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
         * @returns {TeqFw_Http2_Back_Server_Handler_Api_Factory.service}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Handler_Api_Context} apiCtx
             * @returns {Promise<TeqFw_Http2_Back_Server_Handler_Api_Result>}
             * @memberOf Fl32_Bwl_Back_Service_Group_List
             * @implements {TeqFw_Http2_Back_Server_Handler_Api_Factory.service}
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS
                /**
                 * @param {Fl32_Bwl_Shared_Service_Data_Group_Item[]} groups
                 * @param {DMember[]} members
                 * @returns {Fl32_Bwl_Shared_Service_Data_Group_Item[]}
                 */
                function placeMembersToGroups(groups, members) {
                    // map groups by ID
                    /** @type {Object.<Number, Fl32_Bwl_Shared_Service_Data_Group_Item>} */
                    const map = {};
                    for (const one of groups) map[one.groupId] = one;
                    for (const one of members) {
                        const group = map[one.groupId];
                        if (typeof group.members !== 'object') group.members = {};
                        group.members[one.userId] = one.userName;
                    }

                    return groups;
                }

                /**
                 * @param trx
                 * @param {Number} userId
                 * @returns {Promise<Fl32_Bwl_Shared_Service_Data_Group_Item[]>}
                 */
                async function selectGroups(trx, userId) {
                    const result = [];

                    const AS_ACTIVE = 'active';
                    const AS_ADMIN_ID = 'adminId';
                    const AS_ADMIN_NAME = 'adminName';
                    const AS_DATE_JOINED = 'dateJoined';
                    const AS_GROUP_ID = 'groupId';
                    const AS_GROUP_NAME = 'groupName';
                    const AS_MODE = 'mode';
                    const T_G = 'g';
                    const T_GU = 'gu';
                    const T_UP = 'up';

                    // select from group_user
                    const query = trx.from({[T_GU]: EGroupUser.ENTITY});
                    query.select([
                        {[AS_DATE_JOINED]: `${T_GU}.${EGroupUser.A_DATE_JOINED}`},
                        {[AS_ACTIVE]: `${T_GU}.${EGroupUser.A_ACTIVE}`},
                    ]);
                    // join group
                    query.leftOuterJoin(
                        {[T_G]: EGroup.ENTITY},
                        `${T_G}.${EGroup.A_ID}`,
                        `${T_GU}.${EGroupUser.A_GROUP_REF}`);
                    query.select([
                        {[AS_GROUP_ID]: `${T_G}.${EGroup.A_ID}`},
                        {[AS_GROUP_NAME]: `${T_G}.${EGroup.A_NAME}`},
                        {[AS_MODE]: `${T_G}.${EGroup.A_MODE}`},
                        {[AS_ADMIN_ID]: `${T_G}.${EGroup.A_ADMIN_REF}`},
                    ]);

                    // join user profile
                    query.leftOuterJoin(
                        {[T_UP]: eProfile.ENTITY},
                        `${T_UP}.${eProfile.A_USER_REF}`,
                        `${T_G}.${EGroup.A_ADMIN_REF}`);
                    query.select([
                        {[AS_ADMIN_NAME]: `${T_UP}.${eProfile.A_NAME}`},
                    ]);

                    // where
                    query.where(`${T_GU}.${EGroupUser.A_USER_REF}`, userId);
                    /** @type {Array} */
                    const rs = await query;
                    for (const one of rs) {
                        const item = new DGroupItem();
                        item.active = one[AS_ACTIVE];
                        item.adminId = one[AS_ADMIN_ID];
                        item.adminName = one[AS_ADMIN_NAME];
                        item.date = formatDate(one[AS_DATE_JOINED]);
                        item.groupId = one[AS_GROUP_ID];
                        item.groupName = one[AS_GROUP_NAME];
                        item.mode = one[AS_MODE];
                        result.push(item);
                    }
                    result.reverse();
                    return result;
                }

                async function selectMembers(trx, userId) {
                    const result = [];

                    const T_G = 'groups';
                    const T_U = 'users';

                    // select from group_user
                    const query = trx.from({[T_G]: EGroupUser.ENTITY});
                    query.select([
                        {[DMember.GROUP_ID]: `${T_G}.${EGroupUser.A_GROUP_REF}`},
                    ]);

                    // join group_user
                    query.leftOuterJoin(
                        {[T_U]: EGroupUser.ENTITY},
                        `${T_U}.${EGroupUser.A_GROUP_REF}`,
                        `${T_G}.${EGroupUser.A_GROUP_REF}`);
                    query.select([
                        {[DMember.USER_ID]: `${T_U}.${EGroupUser.A_USER_REF}`},
                        {[DMember.USER_NAME]: `${T_U}.${EGroupUser.A_NICK}`},
                    ]);

                    // where
                    query.where(`${T_G}.${EGroupUser.A_USER_REF}`, userId);
                    /** @type {Array} */
                    const rs = await query;
                    for (const one of rs) {
                        const item = Object.assign(new DMember(), one);
                        result.push(item);
                    }
                    return result;
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                result.response = new Response();
                const trx = await rdb.startTransaction();
                // /** @type {Fl32_Bwl_Shared_Service_Route_Group_List_Request} */
                // const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                try {
                    /** @type {Fl32_Teq_User_Shared_Api_Data_User} */
                    const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                    if (user) {
                        const groups = await selectGroups(trx, user.id);
                        const members = await selectMembers(trx, user.id);
                        result.response.items = placeMembersToGroups(groups, members);
                    } else {
                        result.headers[H2.HTTP2_HEADER_STATUS] = H2.HTTP_STATUS_UNAUTHORIZED;
                    }
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(service, 'name', {value: `${this.constructor.name}.${service.name}`});
            return service;
        };
    }

}
