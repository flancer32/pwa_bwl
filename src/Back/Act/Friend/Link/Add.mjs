/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Establish new friendship relation.
 *
 * @namespace Fl32_Bwl_Back_Act_Friend_Link_Add
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Friend_Link_Add';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Friend_Link_Add.process
 * @memberOf Fl32_Bwl_Back_Act_Friend_Link_Add
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Friend} */
    const metaFriend = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend.ATTR} */
    const A_FRIEND = metaFriend.getAttributes();

    // DEFINE INNER FUNCTIONS

    /**
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {number} leaderId
     * @param {number} wingmanId
     * @return {Promise<Object>}
     * @memberOf Fl32_Bwl_Back_Act_Friend_Link_Add
     */
    async function process({trx, leaderId, wingmanId}) {
        return await crud.create(trx, metaFriend, {
            [A_FRIEND.LEADER_REF]: leaderId,
            [A_FRIEND.WINGMAN_REF]: wingmanId,
            [A_FRIEND.DATE_STARTED]: new Date(),
        });
    }

    // COMPOSE RESULT
    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
