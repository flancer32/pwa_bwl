/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Clean up expired friendship relations links.
 *
 * @namespace Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp.process
 * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const ELink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link#']; 

    // DEFINE INNER FUNCTIONS
    /**
     * @param trx
     * @returns {Promise<Number>}
     * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Code_CleanUp
     */
    async function process({trx}) {
        return await trx.from(ELink.ENTITY)
            .where(ELink.A_DATE_EXPIRED, '<', new Date())
            .del();
    }

    // COMPOSE RESULT
    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
