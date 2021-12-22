/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Create code to establish new friendship relation.
 *
 * @namespace Fl32_Bwl_Back_Act_Friend_Link_Code_Create
 */
// MODULE'S IMPORT
import $crypto from 'crypto';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Friend_Link_Code_Create';
const CODE_LENGTH = 16;
const LIFETIME_DAY = 1;

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Friend_Link_Code_Create.process
 * @memberOf Fl32_Bwl_Back_Act_Friend_Link_Code_Create
 */
function Factory(spec) {
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const metaFriendLink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link.ATTR} */
    const A_FRIEND_LINK = metaFriendLink.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {number} userId
     * @returns {Promise<{link: string, dateExp: Date}>}
     * @memberOf Fl32_Bwl_Back_Act_Friend_Link_Code_Create
     */
    async function process({trx, userId}) {
        // DEFINE INNER FUNCTIONS
        /**
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @param {number} userId
         * @param {Date} dateExp
         * @return {Promise<string>}
         */
        async function createLink(trx, userId, dateExp) {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Db_Back_RDb_ITrans} trx
             * @returns {Promise<string>}
             */
            async function generateReferralCode(trx) {
                let code, found;
                do {
                    code = $crypto.randomBytes(CODE_LENGTH).toString('hex').toLowerCase();
                    found = await crud.readOne(trx, metaFriendLink, {[A_FRIEND_LINK.CODE]: code});
                } while (found !== null);
                return code;
            }

            // MAIN FUNCTIONALITY
            const code = await generateReferralCode(trx);
            await crud.create(trx, metaFriendLink, {
                [A_FRIEND_LINK.LEADER_REF]: userId,
                [A_FRIEND_LINK.CODE]: code,
                [A_FRIEND_LINK.DATE_EXPIRED]: dateExp,
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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
