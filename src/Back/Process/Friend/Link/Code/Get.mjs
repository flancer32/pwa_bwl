/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Get friendship relation link.
 *
 * @namespace Fl32_Bwl_Back_Process_Friend_Link_Code_Get
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Friend_Link_Code_Get';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Friend_Link_Code_Get.process
 * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Code_Get
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const ELink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link#']; // class constructor

    // DEFINE INNER FUNCTIONS
    /**
     * @param trx
     * @param {string} code
     * @returns {Promise<Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link>}
     * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Code_Get
     */
    async function process({trx, code}) {
        let result;
        const norm = code.trim().toLowerCase();
        const query = trx.from(ELink.ENTITY);
        query.select();
        query.where(ELink.A_CODE, norm);
        /** @type {Array} */
        const rs = await query;
        if (rs.length === 1) {
            const [first] = rs;
            result = Object.assign(new ELink(), first);
        }
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
