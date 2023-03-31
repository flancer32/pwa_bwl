/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Clean up expired friendship relations links.
 *
 * @namespace Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp.process
 * @memberOf Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp
 */
function Factory(spec) {
    /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const metaFriendLink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link.ATTR} */
    const A_FRIEND_LINK = metaFriendLink.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @returns {Promise<Number>}
     * @memberOf Fl32_Bwl_Back_Act_Friend_Link_Code_CleanUp
     */
    async function process({trx}) {
        const where = (build) => build.where(A_FRIEND_LINK.DATE_EXPIRED, '<', new Date());
        return await crud.deleteSet(trx, metaFriendLink, where);
    }

    // COMPOSE RESULT
    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
