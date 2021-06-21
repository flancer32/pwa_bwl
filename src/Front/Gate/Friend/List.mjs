/**
 * Frontend gate to service to get list of user's friends.
 *
 * @namespace Fl32_Bwl_Front_Gate_Friend_List
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Friend_List';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Bwl_Shared_Service_Route_Friend_List.Request): boolean
 * @memberOf Fl32_Bwl_Front_Gate_Friend_List
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // singleton
    /** @type {Fl32_Bwl_Shared_Service_Route_Friend_List.Factory} */
    const factory = spec['Fl32_Bwl_Shared_Service_Route_Friend_List#Factory$']; // singleton

    // DEFINE INNER FUNCTIONS
    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Friend_List.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Friend_List.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Friend_List
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_FRIEND_LIST);
        if (res) result = factory.createRes(res);
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: `${NS}.${gate.name}`});
    return gate;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
