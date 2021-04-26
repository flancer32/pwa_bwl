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
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Core_App_Db_Connector} */
    const connector = spec['TeqFw_Core_App_Db_Connector$']; // instance singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend} */
    const EAppFriend = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend#']; // class
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const EAppFriendLink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link#']; // class
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
    const EAppProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#']; // class
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
    const EAppSignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In#']; // class
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
    const EAppWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Teq_User_Store_RDb_Schema_User#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Auth_Password} */
    const EUserAuthPass = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Password#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Auth_Session} */
    const EUserAuthSess = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Session#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Email} */
    const EUserIdEmail = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Email#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Phone} */
    const EUserIdPhone = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Phone#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Profile} */
    const EUserProfile = spec['Fl32_Teq_User_Store_RDb_Schema_Profile#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Ref_Link} */
    const EUserRefLink = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Link#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Ref_Tree} */
    const EUserRefTree = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Tree#']; // class


    // DEFINE INNER FUNCTIONS
    /**
     * Action to restore all DB data from dump.
     * @param {Object} dump
     * @returns {Promise<void>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore
     */
    async function action(dump) {
        // DEFINE INNER FUNCTIONS
        /**
         * Get nextval for Postgres serial.
         * @param schema
         * @param {Object} serials
         * @returns {Promise<void>}
         */
        async function setSerials(schema, serials) {
            for (const one of Object.keys(serials)) {
                if (one !== 'app_group_id_seq')
                    schema.raw(`SELECT setval('${one}', ${serials[one]})`);
            }
            await schema;
        }

        async function insertItems(trx, dump, entity) {
            if (Array.isArray(dump[entity]) && dump[entity].length > 0) {
                await trx(entity).insert(dump[entity]);
            }
        }

        // MAIN FUNCTIONALITY
        const trx = await connector.startTransaction();
        try {
            // user
            await insertItems(trx, dump, EUser.ENTITY);
            await insertItems(trx, dump, EUserAuthPass.ENTITY);
            await insertItems(trx, dump, EUserAuthSess.ENTITY);
            await insertItems(trx, dump, EUserIdEmail.ENTITY);
            await insertItems(trx, dump, EUserIdPhone.ENTITY);
            await insertItems(trx, dump, EUserProfile.ENTITY);
            await insertItems(trx, dump, EUserRefLink.ENTITY);
            await insertItems(trx, dump, EUserRefTree.ENTITY);
            // app
            await insertItems(trx, dump, EAppFriend.ENTITY);
            await insertItems(trx, dump, EAppFriendLink.ENTITY);
            await insertItems(trx, dump, EAppProfile.ENTITY);
            await insertItems(trx, dump, EAppSignIn.ENTITY);
            await insertItems(trx, dump, EAppWeightStat.ENTITY);
            // serials for Postgres
            const isPg = trx.client.constructor.name === 'Client_PG';
            if (isPg && dump.serials) {
                const knex = await connector.getKnex();
                const schema = knex.schema;
                await setSerials(schema, dump.serials);
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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
