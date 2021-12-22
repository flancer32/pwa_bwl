/**
 * Create one-time sign in code with limited lifetime.
 *
 * @namespace Fl32_Bwl_Back_Act_Sign_In_Code_Create
 */
// MODULE'S IMPORT
import $crypto from 'crypto';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Sign_In_Code_Create';
const CODE_LENGTH = 16;
const LIFETIME_MIN = 5;

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Sign_In_Code_Create.process
 * @memberOf Fl32_Bwl_Back_Act_Sign_In_Code_Create
 */
function Factory(spec) {
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email} */
    const metaIdEmail = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
    const metaSignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email.ATTR} */
    const A_ID_EMAIL = metaIdEmail.getAttributes();
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.ATTR} */
    const A_SIGN_IN = metaSignIn.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     * Create one-time sign in code with limited lifetime.
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {string} email
     * @returns {Promise<string>}
     * @memberOf Fl32_Bwl_Back_Act_Sign_In_Code_Create
     */
    async function process({trx, email}) {
        // DEFINE INNER FUNCTIONS
        /**
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @returns {Promise<string>}
         */
        async function generateCode(trx) {
            let code, dto;
            do {
                code = $crypto.randomBytes(CODE_LENGTH).toString('hex').toLowerCase();
                dto = await crud.readOne(trx, metaSignIn, {[A_SIGN_IN.CODE]: code});
            } while (dto !== null);
            return code;
        }

        // MAIN FUNCTIONALITY
        let result = null;
        /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email.Dto|null} */
        const found = await crud.readOne(trx, metaIdEmail, {[A_ID_EMAIL.EMAIL]: email});
        if (found?.user_ref) {
            const userId = found.user_ref;
            result = await generateCode(trx);
            const dateExp = new Date();
            dateExp.setUTCMinutes(dateExp.getUTCMinutes() + LIFETIME_MIN);
            await crud.create(trx, metaSignIn, {
                [A_SIGN_IN.USER_REF]: userId,
                [A_SIGN_IN.CODE]: result,
                [A_SIGN_IN.DATE_EXPIRED]: dateExp,
            });
        }
        // COMPOSE RESULT
        return result;
    }

    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
