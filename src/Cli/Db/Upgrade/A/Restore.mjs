/**
 * Action to restore all DB data from dump.
 *
 * @namespace Fl32_Bwl_Cli_Db_Upgrade_A_Restore
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Cli_Db_Upgrade_A_Restore';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Bwl_Cli_Db_Upgrade_A_Restore
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Core_App_Db_Connector} */
    const connector = spec['TeqFw_Core_App_Db_Connector$']; // instance singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Teq_User_Store_RDb_Schema_User#']; // class constructor
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Auth_Password} */
    const EUserAuthPass = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Password#']; // class constructor
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Auth_Session} */
    const EUserAuthSess = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Session#']; // class constructor
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Email} */
    const EUserIdEmail = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Email#']; // class constructor
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Phone} */
    const EUserIdPhone = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Phone#']; // class constructor
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Profile} */
    const EUserProfile = spec['Fl32_Teq_User_Store_RDb_Schema_Profile#']; // class constructor
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Ref_Link} */
    const EUserRefLink = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Link#']; // class constructor
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Ref_Tree} */
    const EUserRefTree = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Tree#']; // class constructor

    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Group} */
    const EGroup = spec['Fl32_Bwl_Store_RDb_Schema_Group#']; // class constructor
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Group_User} */
    const EGroupUser = spec['Fl32_Bwl_Store_RDb_Schema_Group_User#']; // class constructor
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
    const EProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile#']; // class constructor
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile_Group_User} */
    const EProfileGroupUser = spec['Fl32_Bwl_Store_RDb_Schema_Profile_Group_User#']; // class constructor
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Weight_Stat} */
    const EWeightStat = spec['Fl32_Bwl_Store_RDb_Schema_Weight_Stat#']; // class constructor


    // DEFINE INNER FUNCTIONS
    /**
     * Action to restore all DB data from dump.
     * @param {Object} dump
     * @returns {Promise<void>}
     * @memberOf Fl32_Bwl_Cli_Db_Upgrade_A_Restore
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
                schema.raw(`SELECT setval('${one}', ${serials[one]})`);
            }
            await schema;
        }

        // MAIN FUNCTIONALITY
        const trx = await connector.startTransaction();
        try {
            // user
            await trx(EUser.ENTITY).insert(dump[EUser.ENTITY]);
            await trx(EUserAuthPass.ENTITY).insert(dump[EUserAuthPass.ENTITY]);
            await trx(EUserAuthSess.ENTITY).insert(dump[EUserAuthSess.ENTITY]);
            await trx(EUserIdEmail.ENTITY).insert(dump[EUserIdEmail.ENTITY]);
            await trx(EUserIdPhone.ENTITY).insert(dump[EUserIdPhone.ENTITY]);
            await trx(EUserProfile.ENTITY).insert(dump[EUserProfile.ENTITY]);
            //await trx(EUserRefLink.ENTITY).insert(dump[EUserRefLink.ENTITY]); TODO: uncomment it
            await trx(EUserRefTree.ENTITY).insert(dump[EUserRefTree.ENTITY]);
            // app
            await trx(EGroup.ENTITY).insert(dump[EGroup.ENTITY]);
            await trx(EGroupUser.ENTITY).insert(dump[EGroupUser.ENTITY]);
            await trx(EProfile.ENTITY).insert(dump[EProfile.ENTITY]);
            await trx(EProfileGroupUser.ENTITY).insert(dump[EProfileGroupUser.ENTITY]);
            await trx(EWeightStat.ENTITY).insert(dump[EWeightStat.ENTITY]);
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
