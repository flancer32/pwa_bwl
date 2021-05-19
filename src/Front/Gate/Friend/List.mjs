/**
 * Frontend gate to service to get list of user's friends.
 *
 * @namespace Fl32_Bwl_Front_Gate_Friend_List
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Gate_Friend_List';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Bwl_Shared_Service_Route_Friend_List.Request): boolean
 * @memberOf Fl32_Bwl_Front_Gate_Friend_List
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_List.Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_Friend_List#Response']; // class
    /** @type {typeof Fl32_Bwl_Shared_Service_Data_Friend_List_Item} */
    const DItem = spec['Fl32_Bwl_Shared_Service_Data_Friend_List_Item#']; //class

    // DEFINE INNER FUNCTIONS
    /**
     * @param {Fl32_Bwl_Shared_Service_Route_Friend_List.Request} data
     * @returns {Promise<Fl32_Bwl_Shared_Service_Route_Friend_List.Response|boolean>}
     * @memberOf Fl32_Bwl_Front_Gate_Friend_List
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_FRIEND_LIST);
        if (res) {
            result = new Response();
            result.items = [];
            if (Array.isArray(res.items)) {
                for (const one of res.items) {
                    /** @type {Fl32_Bwl_Shared_Service_Data_Friend_List_Item} */
                    const item = Object.assign(new DItem(), one);
                    item.dateStarted = new Date(item.dateStarted);
                    result.items.push(item);
                }
            }
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
