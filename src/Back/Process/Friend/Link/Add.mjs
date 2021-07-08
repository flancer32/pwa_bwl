/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Establish new friendship relation.
 *
 * @namespace Fl32_Bwl_Back_Process_Friend_Link_Add
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Friend_Link_Add';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Friend_Link_Add.process
 * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Add
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend} */
    const EFriend = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend#']; 

    // DEFINE INNER FUNCTIONS

    /**
     * @param trx
     * @param {number} leaderId
     * @param {number} wingmanId
     * @return {Promise<string>}
     * @memberOf Fl32_Bwl_Back_Process_Friend_Link_Add
     */
    async function process({trx, leaderId, wingmanId}) {
        const result = await trx(EFriend.ENTITY)
            .insert({
                [EFriend.A_LEADER_REF]: leaderId,
                [EFriend.A_WINGMAN_REF]: wingmanId,
                [EFriend.A_DATE_STARTED]: new Date(),
            });
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
