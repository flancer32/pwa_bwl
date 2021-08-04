/**
 * Route widget to change app settings.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Route_Settings
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Route_Settings';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Route_Settings
 * @returns {Fl32_Bwl_Front_Door_Pub_Route_Settings.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec['Fl32_Bwl_Front_Layout_TopActions$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang.vueCompTmpl} */
    const lang = spec['Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang$'];

    const template = `
<div>
    <lang/>
</div>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Route_Settings
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {lang},
        async mounted() {
            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                topActions.setActions([]);
            }
        },
    };
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
