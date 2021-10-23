/**
 * Query to get user's friends data.
 *
 * @namespace Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems';

/**
 * Factory to create builder to get queries.
 *
 * @memberOf Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems
 * @returns {Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems.queryBuilder}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend} */
    const EFriend = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend#'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Profile} */
    const metaProfile = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Profile$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Profile.ATTR} */
    const A_PROFILE = metaProfile.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {number} userId
     * @returns {*}
     * @memberOf Fl32_Bwl_Back_Store_RDb_Query_Friend_GetItems
     */
    function queryBuilder({trx, userId}) {
        // alias for the function itself
        const me = queryBuilder;
        const T_PROFILE = trx.getTableName(metaProfile);

        // select from main table
        const query = trx.getQuery({[me.T_F]: EFriend.ENTITY});
        query.select([
            {[me.A_LEADER_ID]: `${me.T_F}.${EFriend.A_LEADER_REF}`},
            {[me.A_WINGMAN_ID]: `${me.T_F}.${EFriend.A_WINGMAN_REF}`},
            {[me.A_DATE_STARTED]: `${me.T_F}.${EFriend.A_DATE_STARTED}`},
        ]);
        // left join user_profile for leader
        query.leftOuterJoin(
            {[me.T_UL]: T_PROFILE},
            `${me.T_UL}.${A_PROFILE.USER_REF}`,
            `${me.T_F}.${EFriend.A_LEADER_REF}`);
        query.select([{[me.A_LEADER_NAME]: `${me.T_UL}.${A_PROFILE.NAME}`}]);
        // left join user_profile for wingman
        query.leftOuterJoin(
            {[me.T_UW]: T_PROFILE},
            `${me.T_UW}.${A_PROFILE.USER_REF}`,
            `${me.T_F}.${EFriend.A_WINGMAN_REF}`);
        query.select([{[me.A_WINGMAN_NAME]: `${me.T_UW}.${A_PROFILE.NAME}`}]);
        // WHERE
        if (userId != null) {
            query.where(`${me.T_F}.${EFriend.A_LEADER_REF}`, userId);
            query.orWhere(`${me.T_F}.${EFriend.A_WINGMAN_REF}`, userId);
        }
        return query;
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(queryBuilder, 'name', {value: `${NS}.${queryBuilder.name}`});
    // pin tables and aliases names been used in the query to the builder
    queryBuilder.A_DATE_STARTED = 'dateStarted';
    queryBuilder.A_LEADER_ID = 'leaderId';
    queryBuilder.A_LEADER_NAME = 'leaderName';
    queryBuilder.A_WINGMAN_ID = 'wingmanId';
    queryBuilder.A_WINGMAN_NAME = 'wingmanName';
    queryBuilder.T_F = 'f';
    queryBuilder.T_UL = 'ul';
    queryBuilder.T_UW = 'uw';

    // COMPOSE RESULT
    return queryBuilder;
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
