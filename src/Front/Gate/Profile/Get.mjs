/**
 * Factory to create frontend gate to 'Get application profile for the user' service.
 * Use as "const gate = spec['Fl32_Bwl_Front_Gate_Profile_Get$']".
 * @namespace Fl32_Bwl_Front_Gate_Profile_Get
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Profile_Get';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Ap_Shared_Service_Route_Profile_Get.Request): boolean
 * @memberOf Fl32_Bwl_Front_Gate_Profile_Get
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Factory} */
    const factory = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Factory$']; // singleton

    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Profile_Get.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Profile_Get.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Profile_Get
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_PROFILE_GET);
        if (res) result = factory.createRes(res);
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: 'Fl32_Bwl_Front_Gate_Profile_Get.gate'});
    return gate;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
