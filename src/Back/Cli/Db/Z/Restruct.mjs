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
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Z_Restruct
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Db_Back_Api_RDb_Schema} */
    const dbSchema = spec['TeqFw_Db_Back_Api_RDb_Schema$'];
    /** @type {TeqFw_Db_Back_Dem_Load} */
    const demLoad = spec['TeqFw_Db_Back_Dem_Load$'];

    // DEFINE INNER FUNCTIONS
    /**
     * Action to re-create database structure (drop-create tables).
     * @returns {Promise<void>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Z_Restruct
     */
    async function action() {
        // load DEMs then drop/create all tables
        const path = config.getPathToRoot();
        const {dem, cfg} = await demLoad.exec({path});
        await dbSchema.setDem({dem});
        await dbSchema.setCfg({cfg});
        await dbSchema.dropAllTables({conn});
        await dbSchema.createAllTables({conn});
        logger.info('Database structure is recreated.');
    }

    // COMPOSE RESULT
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}


// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
