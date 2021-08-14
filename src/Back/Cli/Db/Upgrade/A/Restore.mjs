/**
 * Action to restore all DB data from dump.
 *
 * @namespace Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Db_Back_RDb_Connect} */
    const connector = spec['TeqFw_Db_Back_RDb_Connect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {Function|TeqFw_Db_Back_Util.serialsSet} */
    const serialsSet = spec['TeqFw_Db_Back_Util#serialsSet'];
    /** @type {Function|TeqFw_Db_Back_Util.isPostgres} */
    const isPostgres = spec['TeqFw_Db_Back_Util#isPostgres'];
    /** @type {Function|TeqFw_Db_Back_Util.itemsInsert} */
    const itemsInsert = spec['TeqFw_Db_Back_Util#itemsInsert'];
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
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Teq_User_Store_RDb_Schema_User#'];
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Auth_Password} */
    const EUserAuthPass = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Password#'];
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Auth_Session} */
    const EUserAuthSess = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Session#'];
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Email} */
    const EUserIdEmail = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Email#'];
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Phone} */
    const EUserIdPhone = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Phone#'];
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Profile} */
    const EUserProfile = spec['Fl32_Teq_User_Store_RDb_Schema_Profile#'];
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Ref_Link} */
    const EUserRefLink = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Link#'];
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Ref_Tree} */
    const EUserRefTree = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Tree#'];


    // DEFINE INNER FUNCTIONS
    /**
     * Action to restore all DB data from dump.
     * @param {Object} dump
     * @returns {Promise<void>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore
     */
    async function action(dump) {
        // DEFINE INNER FUNCTIONS

        // MAIN FUNCTIONALITY
        const trx = await connector.startTransaction();
        try {
            // user
            await itemsInsert(trx, dump, EUser.ENTITY);
            await itemsInsert(trx, dump, EUserAuthPass.ENTITY);
            await itemsInsert(trx, dump, EUserAuthSess.ENTITY);
            await itemsInsert(trx, dump, EUserIdEmail.ENTITY);
            await itemsInsert(trx, dump, EUserIdPhone.ENTITY);
            await itemsInsert(trx, dump, EUserProfile.ENTITY);
            await itemsInsert(trx, dump, EUserRefLink.ENTITY);
            await itemsInsert(trx, dump, EUserRefTree.ENTITY);
            // app
            await itemsInsert(trx, dump, EAppFriend.ENTITY);
            await itemsInsert(trx, dump, EAppFriendLink.ENTITY);
            await itemsInsert(trx, dump, EAppProfile.ENTITY);
            await itemsInsert(trx, dump, EAppSignIn.ENTITY);
            await itemsInsert(trx, dump, EAppWeightStat.ENTITY);
            // serials for Postgres
            const isPg = isPostgres(trx.client);
            if (isPg && dump.serials) {
                const knex = await connector.getKnex();
                const schema = knex.schema;
                await serialsSet(schema, dump.serials);
            }
            trx.commit();
            logger.info('Data is restored from the dump.');
        } catch (e) {
            trx.rollback();
            logger.error(`${e.toString()}`);
        }
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    return action;
}


// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

// MODULE'S EXPORT
export default Factory;
