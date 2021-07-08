/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Remove used friendship relation link.
 *
 * @namespace Fl32_Bwl_Back_Process_Friend_Link_Code_Remove
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Friend_Link_Code_Remove';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Friend_Link_Code_Remove.process
 * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Code_Remove
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const ELink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link#']; 

    // DEFINE INNER FUNCTIONS
    /**
     * @param trx
     * @param {string} code
     * @returns {Promise<number>}
     * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Code_Remove
     */
    async function process({trx, code}) {
        const rs = await trx.from(ELink.ENTITY)
            .where(ELink.A_CODE, code.trim().toLowerCase())
            .del();
        return rs;
    }

    // COMPOSE RESULT
    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
