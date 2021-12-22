/**
 * Remove one-time sign-in code.
 *
 * @namespace Fl32_Bwl_Back_Act_Sign_In_Code_Remove
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Sign_In_Code_Remove';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Sign_In_Code_Remove.process
 * @memberOf Fl32_Bwl_Back_Act_Sign_In_Code_Remove
 */
function Factory(spec) {
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
    const metaSignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.ATTR} */
    const A_SIGN_IN = metaSignIn.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     * Remove one-time sign-in code.
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {string} code
     * @returns {Promise<number>}
     * @memberOf Fl32_Bwl_Back_Act_Sign_In_Code_Remove
     */
    async function process({trx, code}) {
        const norm = code.trim().toLowerCase();
        return await crud.deleteOne(trx, metaSignIn, {[A_SIGN_IN.CODE]: norm})
    }

    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
