/**
 * Factory to create frontend gate to 'Get application profile for the user' service.
 * Use as "const gate = spec['Fl32_Bwl_Front_Gate_Profile_Get$']".
 * @namespace Fl32_Bwl_Front_Gate_Profile_Get
 */
export default function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Profile_Get_Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Response']; // class

    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Profile_Get_Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Profile_Get_Response|TeqFw_Core_App_Front_Gate_Response_Error>}
     * @memberOf Fl32_Bwl_Front_Gate_Profile_Get
     */
    async function gate(data) {
        let result = new Response();
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_PROFILE_GET);
        if (res) {
            Object.assign(result, res);
        }
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: 'Fl32_Bwl_Front_Gate_Profile_Get.gate'});
    return gate;
}
