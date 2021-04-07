/**
 * Factory to create frontend gate to 'Group/List' service.
 * Use as "const gate = spec['Fl32_Bwl_Front_Gate_Group_List$']".
 * @namespace Fl32_Bwl_Front_Gate_Group_List
 */
export default function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Group_List_Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_Group_List#Response']; // class

    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Group_List_Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Group_List_Response|TeqFw_Core_App_Front_Gate_Response_Error>}
     * @memberOf Fl32_Bwl_Front_Gate_Group_List
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_GROUP_LIST);
        if (res) {
            result = Object.assign(new Response(), res);
        }
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: 'Fl32_Bwl_Front_Gate_Group_List.gate'});
    return gate;
}
