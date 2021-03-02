/**
 * Factory to create frontend gate to 'Weight/Stat/Save' service.
 * Use as "const gate = spec['Fl32_Bwl_Front_Gate_Weight_Stat_Save$']".
 * @namespace Fl32_Bwl_Front_Gate_Weight_Stat_Save
 */
export default function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Response']; // class constructor

    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Response|TeqFw_Core_App_Front_Gate_Response_Error>}
     * @memberOf Fl32_Bwl_Front_Gate_Weight_Stat_Save
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_WEIGHT_STAT_SAVE);
        if (res) {
            result = Object.assign(new Response(), res);
        }
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: 'Fl32_Bwl_Front_Gate_Weight_Stat_Save.gate'});
    return gate;
}
