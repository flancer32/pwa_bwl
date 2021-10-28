/**
 * Route widget to change app settings.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_Settings_Route
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_Settings_Route';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Settings_Route
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_Settings_Route.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec['Fl32_Bwl_Front_Layout_TopActions$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang.vueCompTmpl} */
    const lang = spec['Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_Settings_Push.vueCompTmpl} */
    const push = spec['Fl32_Bwl_Front_Door_Pub_Widget_Settings_Push$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_Settings_SwConfig.vueCompTmpl} */
    const swConfig = spec['Fl32_Bwl_Front_Door_Pub_Widget_Settings_SwConfig$'];

    const template = `
<div class="q-pa-xs q-gutter-xs">
    <lang/>
    <push/>
    <sw-config/>
</div>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Settings_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {lang, push, swConfig},
        methods: {

        },
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
