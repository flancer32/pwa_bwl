/**
 * Clean up expired one-time sign in codes.
 *
 * @namespace Fl32_Bwl_Back_Act_Sign_In_Code_CleanUp
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Sign_In_Code_CleanUp';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Sign_In_Code_CleanUp.process
 * @memberOf Fl32_Bwl_Back_Act_Sign_In_Code_CleanUp
 */
function Factory(spec) {
    /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
    const metaSignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.ATTR} */
    const A_SIGN_IN = metaSignIn.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     * Clean up expired one-time sign in codes.
     *
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @returns {Promise<number>}
     * @memberOf Fl32_Bwl_Back_Act_Sign_In_Code_CleanUp
     */
    async function process({trx}) {
        const where = (build) => build.where(A_SIGN_IN.DATE_EXPIRED, '<', new Date());
        return await crud.deleteSet(trx, metaSignIn, where);
    }

    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
