/**
 * Frontend gate to 'Check one-time sign-in code' service.
 *
 * @namespace Fl32_Bwl_Front_Gate_Sign_In_Code_Check
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Sign_In_Code_Check';

/**
 * Factory to create frontend gate.
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // singleton
    /** @type {TeqFw_Http2_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Http2_Front_Gate_Connect$']; // singleton
    /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Factory} */
    const factory = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check#Factory$']; // singleton

    /**
     * Frontend gate to 'Check one-time sign-in code' service.
     *
     * @param {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Sign_In_Code_Check
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_SIGN_IN_CODE_CHECK);
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
