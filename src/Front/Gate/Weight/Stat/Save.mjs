/**
 * Gate to use 'Weight/Stat/Save' service.
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Weight_Stat_Save';

/**
 * Factory to create frontend gate.
 * @namespace Fl32_Bwl_Front_Gate_Weight_Stat_Save
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // singleton
    /** @type {TeqFw_Http2_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Http2_Front_Gate_Connect$']; // singleton
    /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Factory} */
    const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Factory$']; // singleton


    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Weight_Stat_Save
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_WEIGHT_STAT_SAVE);
        if (res) result = factRoute.createRes(res);
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: `${NS}.${gate.name}`});
    return gate;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
