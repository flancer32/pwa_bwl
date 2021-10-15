/**
 * Drop all tables in RDB.
 *
 * @namespace Fl32_Bwl_Back_Cli_Db_Drop
 */
const NS = 'Fl32_Bwl_Back_Cli_Db_Drop';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Drop
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Back_Defaults} */
    const DEF = spec['Fl32_Bwl_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Db_Back_RDb_ISchema} */
    const dbSchema = spec['TeqFw_Db_Back_RDb_ISchema$'];
    /** @type {TeqFw_Db_Back_Dem_Load} */
    const demLoad = spec['TeqFw_Db_Back_Dem_Load$'];

    // DEFINE INNER FUNCTIONS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Core_Back_Cli_Version
     */
    const action = async function () {
        logger.pause(false);
        try {
            // load DEMs then drop/create all tables
            const path = config.getBoot().projectRoot;
            const {dem, cfg} = await demLoad.exec({path});
            await dbSchema.setDem({dem});
            await dbSchema.setCfg({cfg});
            await dbSchema.dropAllTables({conn});
            logger.info('All tables are dropped in the database.');
        } catch (e) {
            logger.error(`${e.toString()}`);
        }
        await conn.disconnect();
    };
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'db-drop';
    res.desc = 'Drop all tables in the database.';
    res.action = action;
    return res;
}
