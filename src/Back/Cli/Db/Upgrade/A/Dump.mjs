/**
 * Action to dump all DB data.
 *
 * @namespace Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Db_Back_Util.serialsGetOne|Function} */
    const serialsGetOne = spec['TeqFw_Db_Back_Util#serialsGetOne'];
    /** @type {TeqFw_Db_Back_Util.getTables|Function} */
    const getTables = spec['TeqFw_Db_Back_Util#getTables'];
    /** @type {TeqFw_Db_Back_Util.itemsSelect|Function} */
    const itemsSelect = spec['TeqFw_Db_Back_Util#itemsSelect'];
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend} */
    const EAppFriend = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend#'];
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const EAppFriendLink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link#'];
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
    const EAppProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#'];
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
    const EAppSignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In#'];
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
    const EAppWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#'];
    /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} */
    const metaWebPushSubscript = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript$'];
    /** @type {TeqFw_User_Back_Store_RDb_Schema_User} */
    const metaUser = spec['TeqFw_User_Back_Store_RDb_Schema_User$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Profile} */
    const metaProfile = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Profile$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Password} */
    const metaAuthPass = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Password$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Session} */
    const metaAuthSess = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Session$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email} */
    const metaIdEmail = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Id_Phone} */
    const metaIdPhone = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Id_Phone$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Link} */
    const metaRefLink = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Link$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Tree} */
    const metaRefTree = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Tree$'];

    // DEFINE INNER FUNCTIONS
    /**
     * Action to dump all DB data.
     * @returns {Promise<null|Object>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump
     */
    async function action() {
        const trx = await conn.startTransaction();
        const T_AUTH_PASS = trx.getTableName(metaAuthPass);
        const T_AUTH_SESS = trx.getTableName(metaAuthSess);
        const T_ID_EMAIL = trx.getTableName(metaIdEmail);
        const T_ID_PHONE = trx.getTableName(metaIdPhone);
        const T_PROFILE = trx.getTableName(metaProfile);
        const T_REF_LINK = trx.getTableName(metaRefLink);
        const T_REF_TREE = trx.getTableName(metaRefTree);
        const T_USER = trx.getTableName(metaUser);
        const T_WEB_PUSH_SUBSCRIPT = trx.getTableName(metaWebPushSubscript);

        try {
            const result = {};
            const tables = await getTables(trx);
            // app data
            result[EAppFriend.ENTITY] = await itemsSelect(trx, tables, EAppFriend.ENTITY);
            result[EAppFriendLink.ENTITY] = await itemsSelect(trx, tables, EAppFriendLink.ENTITY);
            result[EAppProfile.ENTITY] = await itemsSelect(trx, tables, EAppProfile.ENTITY);
            result[EAppSignIn.ENTITY] = await itemsSelect(trx, tables, EAppSignIn.ENTITY);
            result[EAppWeightStat.ENTITY] = await itemsSelect(trx, tables, EAppWeightStat.ENTITY);
            // users data
            result[T_USER] = await itemsSelect(trx, tables, T_USER);
            result[T_AUTH_PASS] = await itemsSelect(trx, tables, T_AUTH_PASS);
            result[T_AUTH_SESS] = await itemsSelect(trx, tables, T_AUTH_SESS);
            result[T_ID_EMAIL] = await itemsSelect(trx, tables, T_ID_EMAIL);
            result[T_ID_PHONE] = await itemsSelect(trx, tables, T_ID_PHONE);
            result[T_PROFILE] = await itemsSelect(trx, tables, T_PROFILE);
            result[T_REF_LINK] = await itemsSelect(trx, tables, T_REF_LINK);
            result[T_REF_TREE] = await itemsSelect(trx, tables, T_REF_TREE);
            // web-push
            result[T_WEB_PUSH_SUBSCRIPT] = await itemsSelect(trx, tables, T_WEB_PUSH_SUBSCRIPT);
            // serials for Postgres
            const isPg = trx.isPostgres();
            if (isPg) {
                const knex = await conn.getKnex();
                const schema = knex.schema;
                result.series = {};
                let name = `${T_USER}_id_seq`;
                result.series[name] = await serialsGetOne(schema, name);
                name = `${T_WEB_PUSH_SUBSCRIPT}_id_seq`;
                result.series[name] = await serialsGetOne(schema, name);
            }
            // perform queries to insert data and commit changes
            await trx.commit();
            logger.info('All data is dumped.');
            return result;
        } catch (e) {
            await trx.rollback();
            logger.error(`${e.toString()}`);
            return null;
        }
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    return action;
}


// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
