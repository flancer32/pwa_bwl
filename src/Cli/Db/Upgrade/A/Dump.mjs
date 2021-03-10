/**
 * Action to dump all DB data.
 *
 * @namespace Fl32_Bwl_Cli_Db_Upgrade_A_Dump
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Cli_Db_Upgrade_A_Dump';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Bwl_Cli_Db_Upgrade_A_Dump
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
     * Action to dump all DB data.
     * @returns {Promise<null|Object>}
     * @memberOf Fl32_Bwl_Cli_Db_Upgrade_A_Dump
     */
    async function action() {
        // DEFINE INNER FUNCTIONS
        /**
         * Get nextval for Postgres serial.
         * @param schema
         * @param {String[]} serials
         * @returns {Promise<Object>}
         */
        async function getSerials(schema, serials) {
            const result = {};
            for (const one of serials) {
                schema.raw(`SELECT nextval('${one}')`);
            }
            const rs = await schema;
            for (const i in rs) {
                const key = serials[i];
                result[key] = rs[i].rows[0].nextval;
            }
            return result;
        }

        // MAIN FUNCTIONALITY
        const trx = await connector.startTransaction();
        try {
            const result = {};
            // app data
            result[EGroup.ENTITY] = await trx.select().from(EGroup.ENTITY);
            result[EGroupUser.ENTITY] = await trx.select().from(EGroupUser.ENTITY);
            result[EProfile.ENTITY] = await trx.select().from(EProfile.ENTITY);
            result[EProfileGroupUser.ENTITY] = await trx.select().from(EProfileGroupUser.ENTITY);
            result[EWeightStat.ENTITY] = await trx.select().from(EWeightStat.ENTITY);
            // users data
            result[eUser.ENTITY] = await trx.select().from(eUser.ENTITY);
            result[eUserAuthPass.ENTITY] = await trx.select().from(eUserAuthPass.ENTITY);
            result[eUserAuthSess.ENTITY] = await trx.select().from(eUserAuthSess.ENTITY);
            result[eUserIdEmail.ENTITY] = await trx.select().from(eUserIdEmail.ENTITY);
            result[eUserIdPhone.ENTITY] = await trx.select().from(eUserIdPhone.ENTITY);
            result[eUserProfile.ENTITY] = await trx.select().from(eUserProfile.ENTITY);
            result[eUserRefLink.ENTITY] = await trx.select().from(eUserRefLink.ENTITY);
            result[eUserRefTree.ENTITY] = await trx.select().from(eUserRefTree.ENTITY);
            // serials for Postgres
            const isPg = trx.client.constructor.name === 'Client_PG';
            if (isPg) {
                const knex = await connector.getKnex();
                const schema = knex.schema;
                const userId = `${eUser.ENTITY}_id_seq`;
                const groupId = `${EGroup.ENTITY}_id_seq`;
                result.serials = await getSerials(schema, [userId, groupId]);
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
