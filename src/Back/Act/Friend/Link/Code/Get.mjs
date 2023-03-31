/**
 * TODO: don't use function factory for 'process' - there are some troubles with code lookup & refactoring in IDEA
 *
 * Get friendship relation link.
 *
 * @namespace Fl32_Bwl_Back_Act_Friend_Link_Code_Get
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Friend_Link_Code_Get';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Friend_Link_Code_Get.process
 * @memberOf Fl32_Bwl_Back_Act_Friend_Link_Code_Get
 */
function Factory(spec) {
    // EXTRACT DEPS
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
     * @param {string} code
     * @returns {Promise<Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link.Dto|null>}
     * @memberOf Fl32_Bwl_Back_Act_Friend_Link_Code_Get
     */
    async function process({trx, code}) {
        const norm = code.trim().toLowerCase();
        return await crud.readOne(trx, metaFriendLink, {[A_FRIEND_LINK.CODE]: norm});
    }

    // COMPOSE RESULT
    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
