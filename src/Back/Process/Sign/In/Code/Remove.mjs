/**
 * Remove one-time sign-in code.
 *
 * @namespace Fl32_Bwl_Back_Process_Sign_In_Code_Remove
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Sign_In_Code_Remove';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Sign_In_Code_Remove.process
 * @memberOf Fl32_Bwl_Back_Process_Sign_In_Code_Remove
 */
function Factory(spec) {
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
    const ESignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In#']; 

    /**
     * Remove one-time sign-in code.
     * @param trx
     * @param {String} code
     * @returns {Promise<Number>}
     * @memberOf Fl32_Bwl_Back_Process_Sign_In_Code_Remove
     */
    async function process({trx, code}) {
        const rs = await trx.from(ESignIn.ENTITY)
            .where(ESignIn.A_CODE, code.trim().toLowerCase())
            .del();
        return rs;
    }

    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
