/**
 * Frontend gate to service to ...
 *
 * @namespace Fl32_Bwl_Front_Gate_Friend_Link_Code_Create
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Friend_Link_Code_Create';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request): boolean
 * @memberOf Fl32_Bwl_Front_Gate_Friend_Link_Code_Create
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create#Response']; // class
    /** @type {typeof Fl32_Bwl_Shared_Service_Data_Friend_Link} */
    const DLink = spec['Fl32_Bwl_Shared_Service_Data_Friend_Link#']; // class

    // DEFINE INNER FUNCTIONS
    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Friend_Link_Code_Create
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_FRIEND_LINK_CODE_CREATE);
        if (res) {
            result = Object.assign(new Response(), res);
            result.link = Object.assign(new DLink(), result.link);
            result.link.dateExpired = new Date(result.link.dateExpired);
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
