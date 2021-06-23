/**
 * Factory to create frontend gate to 'Weight/History/List' service.
 * Use as "const gate = spec['Fl32_Bwl_Front_Gate_Weight_History_List$']".
 * @namespace Fl32_Bwl_Front_Gate_Weight_History_List
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Weight_History_List';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Ap_Shared_Service_Route_Profile_Get.Request): boolean
 * @memberOf Fl32_Bwl_Front_Gate_Weight_History_List
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // singleton
    /** @type {TeqFw_Http2_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Http2_Front_Gate_Connect$']; // singleton
 /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Factory} */
    const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Factory$']; // singleton

    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Weight_History_List.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Weight_History_List
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_WEIGHT_HISTORY_LIST);
        if (res) result = factRoute.createRes(res);
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: 'Fl32_Bwl_Front_Gate_Weight_History_List.gate'});
    return gate;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
