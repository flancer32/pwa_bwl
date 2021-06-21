/**
 * Frontend gate to service to establish friendship relations using generated code.
 *
 * @namespace Fl32_Bwl_Front_Gate_Friend_Link_Add
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Friend_Link_Add';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Request): boolean
 * @memberOf Fl32_Bwl_Front_Gate_Friend_Link_Add
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // singleton
    /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Factory} */
    const factory = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Add#Factory$']; // singleton

    // DEFINE INNER FUNCTIONS
    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Friend_Link_Add
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_FRIEND_LINK_ADD);
        if (res) result = factory.createRes(res);
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: `${NS}.${gate.name}`});
    return gate;
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
