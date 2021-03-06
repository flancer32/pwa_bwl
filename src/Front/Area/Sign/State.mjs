/**
 * Aggregated state for 'sign' realm.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @return {Object}
 */
function Fl32_Bwl_Front_Area_Sign_State(spec) {
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
        modules: {},
    };
}

// We should place function separately to allow JSDoc & IDEA hints & navigation.
export default Fl32_Bwl_Front_Area_Sign_State;
