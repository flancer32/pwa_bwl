/**
 * Action to re-create database structure (drop-create tables).
 *
 * @namespace Fl32_Bwl_Back_Cli_Db_Z_Restruct
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Back_Cli_Db_Z_Restruct';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup context and to create the action.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Z_Restruct
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Core_Back_RDb_Connector} */
    const connector = spec['TeqFw_Core_Back_RDb_Connector$']; 
    /** @type {TeqFw_Core_Logger} */
    const logger = spec['TeqFw_Core_Logger$'];  
    /** @type {Fl32_Teq_User_Plugin_Store_RDb_Setup} */
    const setupTeqUser = spec['Fl32_Teq_User_Plugin_Store_RDb_Setup$']; 
    /** @type {Fl32_Bwl_Plugin_Store_RDb_Setup} */
    const setupApp = spec['Fl32_Bwl_Plugin_Store_RDb_Setup$']; 

    // DEFINE INNER FUNCTIONS
    /**
     * Action to re-create database structure (drop-create tables).
     * @returns {Promise<void>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Z_Restruct
     */
    async function action() {
        const knex = await connector.getKnex();
        // compose queries to recreate DB structure
        /** @type {SchemaBuilder} */
        const builder = connector.getSchema();

        // drop tables considering relations (1) then drop base registries (0)
        // (1)
        setupApp.dropTables1(builder);
        setupTeqUser.dropTables1(builder);
        // (0)
        setupApp.dropTables0(builder);
        setupTeqUser.dropTables0(builder);
        // create tables
        setupTeqUser.createStructure(knex, builder);
        setupApp.createStructure(knex, builder);
        // perform queries to recreate DB structure
        await builder;
        logger.info('Database structure is recreated.');
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
