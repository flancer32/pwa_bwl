/**
 * @namespace Fl32_Bwl_Back_Cli_Db_Upgrade
 */

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Back_Cli_Db_Upgrade';

/**
 * Factory class to create CLI command to backup live data, upgrade database structures then restore data.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @returns {TeqFw_Core_App_Cli_Command_Data}
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];   // singleton
    /** @type {typeof TeqFw_Core_App_Cli_Command_Data} */
    const Command = spec['TeqFw_Core_App_Cli_Command#Data'];    // class
    /** @type {TeqFw_Core_App_Db_Connector} */
    const connector = spec['TeqFw_Core_App_Db_Connector$']; // singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // singleton
    /** @type {Function|Fl32_Bwl_Back_Cli_Db_Z_Restruct.action} */
    const actRestruct = spec['Fl32_Bwl_Back_Cli_Db_Z_Restruct$']; // singleton
    /** @type {Function|Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump.action} */
    const actDump = spec['Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump$']; // singleton
    /** @type {Function|Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore.action} */
    const actRestore = spec['Fl32_Bwl_Back_Cli_Db_Upgrade_A_Restore$']; // singleton


    // DEFINE INNER FUNCTIONS
    /**
     * Backup data, drop-create tables then restore data.
     *
     * @returns {Promise<void>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade
     */
    const action = async function () {
        // dump data
        const dump = await actDump();
        if (dump) {
            // recreate DB structure
            await actRestruct();
            // restore data from dump
            await actRestore(dump);
            logger.info('Upgrade actions are done.');
        } else {
            logger.info('Dump is failed. Abort action.');
        }
        // close DB connections
        await connector.disconnect();
    };

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const result = new Command();
    result.ns = DEF.BACK_REALM;
    result.name = 'db-upgrade';
    result.desc = 'Backup data, drop-create tables then restore data.';
    result.action = action;
    return result;
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
