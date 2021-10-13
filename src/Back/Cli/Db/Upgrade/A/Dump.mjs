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
    const connector = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Db_Back_Util.serialsGetOne|Function} */
    const serialsGetOne = spec['TeqFw_Db_Back_Util#serialsGetOne'];
    /** @type {TeqFw_Db_Back_Util.getTables|Function} */
    const getTables = spec['TeqFw_Db_Back_Util#getTables'];
    /** @type {TeqFw_Db_Back_Util.isPostgres|Function} */
    const isPostgres = spec['TeqFw_Db_Back_Util#isPostgres'];
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
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Teq_User_Back_Store_RDb_Schema_User#'];
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Password} */
    const EUserAuthPass = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Password#'];
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Session} */
    const EUserAuthSess = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Session#'];
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email} */
    const EUserIdEmail = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email#'];
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Id_Phone} */
    const EUserIdPhone = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Id_Phone#'];
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Profile} */
    const EUserProfile = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Profile#'];
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Link} */
    const EUserRefLink = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Link#'];
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Tree} */
    const EUserRefTree = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Tree#'];
    /** @type {typeof TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} */
    const EWebPushSubscript = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript#'];


    // DEFINE INNER FUNCTIONS
    /**
     * Action to dump all DB data.
     * @returns {Promise<null|Object>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump
     */
    async function action() {
        const trx = await connector.startTransaction();
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
            result[EUser.ENTITY] = await itemsSelect(trx, tables, EUser.ENTITY);
            result[EUserAuthPass.ENTITY] = await itemsSelect(trx, tables, EUserAuthPass.ENTITY);
            result[EUserAuthSess.ENTITY] = await itemsSelect(trx, tables, EUserAuthSess.ENTITY);
            result[EUserIdEmail.ENTITY] = await itemsSelect(trx, tables, EUserIdEmail.ENTITY);
            result[EUserIdPhone.ENTITY] = await itemsSelect(trx, tables, EUserIdPhone.ENTITY);
            result[EUserProfile.ENTITY] = await itemsSelect(trx, tables, EUserProfile.ENTITY);
            result[EUserRefLink.ENTITY] = await itemsSelect(trx, tables, EUserRefLink.ENTITY);
            result[EUserRefTree.ENTITY] = await itemsSelect(trx, tables, EUserRefTree.ENTITY);
            // web-push
            result[EWebPushSubscript.ENTITY] = await itemsSelect(trx, tables, EWebPushSubscript.ENTITY);
            // serials for Postgres
            const isPg = isPostgres(trx.client);
            if (isPg) {
                const knex = await connector.getKnex();
                const schema = knex.schema;
                // const serials = [
                //     `${EUser.ENTITY}_id_seq`,
                //     `${EWebPushSubscript.ENTITY}_id_seq`,
                // ];
                // result.serials = await serialsGet(schema, serials);
                result.series = {};
                let name = `${EUser.ENTITY}_id_seq`;
                result.series[name] = await serialsGetOne(schema, name);
                name = `${EWebPushSubscript.ENTITY}_id_seq`;
                result.series[name] = await serialsGetOne(schema, name);
            }
            // perform queries to insert data and commit changes
            trx.commit();
            logger.info('All data is dumped.');
            return result;
        } catch (e) {
            trx.rollback();
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
