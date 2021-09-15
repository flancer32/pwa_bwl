/**
 * Create one-time sign in code with limited lifetime.
 *
 * @namespace Fl32_Bwl_Back_Process_Sign_In_Code_Create
 */
// MODULE'S IMPORT
import $crypto from 'crypto';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Sign_In_Code_Create';
const CODE_LENGTH = 16;
const LIFETIME_MIN = 5;

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Sign_In_Code_Create.process
 * @memberOf Fl32_Bwl_Back_Process_Sign_In_Code_Create
 */
function Factory(spec) {
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
    const ESignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In#'];
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Email} */
    const EIdEmail = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Email#'];

    /**
     * Create one-time sign in code with limited lifetime.
     * @param trx
     * @param {String} email
     * @returns {Promise<String>}
     * @memberOf Fl32_Bwl_Back_Process_Sign_In_Code_Create
     */
    async function process({trx, email}) {
        // DEFINE INNER FUNCTIONS
        /**
         * @param trx
         * @returns {Promise<string>}
         */
        async function generateCode(trx) {
            let code, rs;
            do {
                code = $crypto.randomBytes(CODE_LENGTH).toString('hex').toLowerCase();
                const query = trx.from(ESignIn.ENTITY);
                rs = await query.select().where(ESignIn.A_CODE, code);
            } while (rs.length > 0);
            return code;
        }

        /**
         * @param trx
         * @param {String} email
         * @returns {Promise<Number>}
         */
        async function getUserId(trx, email) {
            const query = trx.from(EIdEmail.ENTITY);
            query.select([EIdEmail.A_USER_REF]);
            query.where({
                [EIdEmail.A_EMAIL]: email
            });
            /** @type {Array} */
            const rs = await query;
            if (rs.length === 1) {
                const [first] = rs;
                return first[EIdEmail.A_USER_REF];
            } else {
                return null;
            }
        }

        // MAIN FUNCTIONALITY
        let result = null;
        const userId = await getUserId(trx, email);
        if (userId !== null) {
            result = await generateCode(trx);
            const dateExp = new Date();
            dateExp.setUTCMinutes(dateExp.getUTCMinutes() + LIFETIME_MIN);
            await trx(ESignIn.ENTITY)
                .insert({
                    [ESignIn.A_USER_REF]: userId,
                    [ESignIn.A_CODE]: result,
                    [ESignIn.A_DATE_EXPIRED]: dateExp,
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
