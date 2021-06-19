/**
 * Frontend gate to 'Weight/History/Remove' service.
 *
 * @namespace Fl32_Bwl_Front_Gate_Weight_History_Remove
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Weight_History_Remove';

/**
 * Factory to create frontend gate.
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_Remove#Response']; // class

    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Response|TeqFw_Core_App_Front_Gate_Response_Error>}
     * @memberOf Fl32_Bwl_Front_Gate_Weight_History_Remove
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_WEIGHT_HISTORY_REMOVE);
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
