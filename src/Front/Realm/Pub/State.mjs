/**
 * Aggregated state for 'pub' realm.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @return {Object}
 */
function Fl32_Bwl_Front_Realm_Pub_State(spec) {
    /** @type {Fl32_Teq_User_Front_State} */
    const user = spec['Fl32_Teq_User_Front_State$'];   // singleton object

    return {
        namespaced: true,
        state: {
            lang: 'en-US',
            title: 'Weight Loss',
            weight: {
                current: 0,
                start: 0,
                target: 0,
            },
        },
        modules: {user},
    };
}

// We should place function separately to allow JSDoc & IDEA hints & navigation.
export default Fl32_Bwl_Front_Realm_Pub_State;
