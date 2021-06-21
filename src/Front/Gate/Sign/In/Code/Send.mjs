/**
 * Frontend gate to 'Send one-time sign-in code' service.
 *
 * @namespace Fl32_Bwl_Front_Gate_Sign_In_Code_Send
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Sign_In_Code_Send';

/**
 * Factory to create frontend gate.
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // singleton
    /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Factory} */
    const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send#Factory$']; // singleton

    /**
     * Frontend gate to 'Send one-time sign-in code' service.
     *
     * @param {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Sign_In_Code_Send
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_SIGN_IN_CODE_SEND);
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
