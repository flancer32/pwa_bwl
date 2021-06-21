/**
 * Frontend gate to application 'Sign Up' service.
 *
 * @namespace Fl32_Bwl_Front_Gate_Sign_Up
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Sign_Up';

/**
 * Factory to create frontend gate.
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // singleton
    /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Factory} */
    const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Sign_Up#Factory$']; // singleton

    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Sign_Up.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Sign_Up
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_SIGN_UP);
        if (res) result = factRoute.createRes(res);
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: `${NS}.${gate.name}`});
    return gate;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
