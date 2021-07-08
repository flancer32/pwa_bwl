/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Create code to establish new friendship relation.
 *
 * @namespace Fl32_Bwl_Back_Process_Friend_Link_Code_Create
 */
// MODULE'S IMPORT
import $crypto from 'crypto';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Friend_Link_Code_Create';
const CODE_LENGTH = 16;
const LIFETIME_DAY = 1;

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Friend_Link_Code_Create.process
 * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Code_Create
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const ELink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link#']; 

    // DEFINE INNER FUNCTIONS
    /**
     * @param trx
     * @param {Number} userId
     * @returns {Promise<{link: string, dateExp: Date}>}
     * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Code_Create
     */
    async function process({trx, userId}) {
        // DEFINE INNER FUNCTIONS
        async function createLink(trx, userId, dateExp) {
            // DEFINE INNER FUNCTIONS
            /**
             * @param trx
             * @returns {Promise<string>}
             */
            async function generateReferralCode(trx) {
                let code, rs;
                do {
                    code = $crypto.randomBytes(CODE_LENGTH).toString('hex').toLowerCase();
                    const query = trx.from(ELink.ENTITY);
                    rs = await query.select().where(ELink.A_CODE, code);
                } while (rs.length > 0);
                return code;
            }

            // MAIN FUNCTIONALITY
            const code = await generateReferralCode(trx);
            await trx(ELink.ENTITY)
                .insert({
                    [ELink.A_LEADER_REF]: userId,
                    [ELink.A_CODE]: code,
                    [ELink.A_DATE_EXPIRED]: dateExp,
                });
            // COMPOSE RESULT
            return code;
        }

        // MAIN FUNCTIONALITY
        const dateExp = new Date();
        dateExp.setUTCDate(dateExp.getUTCDate() + LIFETIME_DAY);
        const link = await createLink(trx, userId, dateExp);
        // COMPOSE RESULT
        return {link, dateExp};
    }

    // COMPOSE RESULT
    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
