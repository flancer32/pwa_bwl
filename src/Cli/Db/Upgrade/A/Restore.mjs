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
    /** @type {Fl32_Teq_User_Store_RDb_Schema_User} */
    const eUser = spec['Fl32_Teq_User_Store_RDb_Schema_User$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Auth_Password} */
    const eUserAuthPass = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Password$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Auth_Session} */
    const eUserAuthSess = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Session$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Id_Email} */
    const eUserIdEmail = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Email$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Id_Phone} */
    const eUserIdPhone = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Phone$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Profile} */
    const eUserProfile = spec['Fl32_Teq_User_Store_RDb_Schema_Profile$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Ref_Link} */
    const eUserRefLink = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Link$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Ref_Tree} */
    const eUserRefTree = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Tree$']; // instance singleton

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
            await trx(eUser.ENTITY).insert(dump[eUser.ENTITY]);
            await trx(eUserAuthPass.ENTITY).insert(dump[eUserAuthPass.ENTITY]);
            await trx(eUserAuthSess.ENTITY).insert(dump[eUserAuthSess.ENTITY]);
            await trx(eUserIdEmail.ENTITY).insert(dump[eUserIdEmail.ENTITY]);
            await trx(eUserIdPhone.ENTITY).insert(dump[eUserIdPhone.ENTITY]);
            await trx(eUserProfile.ENTITY).insert(dump[eUserProfile.ENTITY]);
            await trx(eUserRefLink.ENTITY).insert(dump[eUserRefLink.ENTITY]);
            await trx(eUserRefTree.ENTITY).insert(dump[eUserRefTree.ENTITY]);
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
