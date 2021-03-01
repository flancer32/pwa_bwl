/**
 * Factory to create frontend gate to 'SignUp/Init' service.
 * Use as "const gate = spec['Fl32_Bwl_Front_Gate_SignUp_Init$']".
 * @namespace Fl32_Bwl_Front_Gate_SignUp_Init
 */
export default function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_SignUp_Init_Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_SignUp_Init#Response']; // class constructor

    /**
     * @param {Fl32_Bwl_Shared_Service_Route_SignUp_Init_Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_SignUp_Init_Response|TeqFw_Core_App_Front_Gate_Response_Error>}
     * @memberOf Fl32_Bwl_Front_Gate_SignUp_Init
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_SIGN_UP_INIT);
        if (res) {
            result = Object.assign(new Response(), res);
        }
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: 'Fl32_Bwl_Front_Gate_SignUp_Init.gate'});
    return gate;
}
