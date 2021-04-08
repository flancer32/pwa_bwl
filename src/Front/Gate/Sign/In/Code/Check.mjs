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
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check#Response']; // class constructor

    /**
     * Frontend gate to 'Check one-time sign-in code' service.
     *
     * @param {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Sign_In_Code_Check
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_SIGN_IN_CODE_CHECK);
        if (res) {
            result = Object.assign(new Response(), res);
        }
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
