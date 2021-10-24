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
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const connector = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Db_Back_Util.serialsSet|Function} */
    const serialsSet = spec['TeqFw_Db_Back_Util#serialsSet'];
    /** @type {TeqFw_Db_Back_Util.itemsInsert|Function} */
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
     * Action to restore all DB data from dump.
     * @param {Object} dump
     * @returns {Promise<void>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore
     */
    async function action(dump) {

        // MAIN FUNCTIONALITY
        const trx = await connector.startTransaction();
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
            // user
            await itemsInsert(trx, dump, T_USER);
            await itemsInsert(trx, dump, T_AUTH_PASS);
            await itemsInsert(trx, dump, T_AUTH_SESS);
            await itemsInsert(trx, dump, T_ID_EMAIL);
            await itemsInsert(trx, dump, T_ID_PHONE);
            await itemsInsert(trx, dump, T_PROFILE);
            await itemsInsert(trx, dump, T_REF_LINK);
            await itemsInsert(trx, dump, T_REF_TREE);
            // app
            await itemsInsert(trx, dump, EAppFriend.ENTITY);
            await itemsInsert(trx, dump, EAppFriendLink.ENTITY);
            await itemsInsert(trx, dump, EAppProfile.ENTITY);
            await itemsInsert(trx, dump, EAppSignIn.ENTITY);
            await itemsInsert(trx, dump, EAppWeightStat.ENTITY);
            // web-push
            await itemsInsert(trx, dump, T_WEB_PUSH_SUBSCRIPT);
            // serials for Postgres
            const isPg = trx.isPostgres();
            if (isPg && dump.serials) {
                const knex = await connector.getKnex();
                const schema = knex.schema;
                await serialsSet(schema, dump.serials);
            }
            await trx.commit();
            logger.info('Data is restored from the dump.');
        } catch (e) {
            await trx.rollback();
            logger.error(`${e.toString()}`);
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
