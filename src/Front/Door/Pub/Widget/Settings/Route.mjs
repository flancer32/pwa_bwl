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
    /** @type {TeqFw_Web_Front_Model_Sw_Control} */
    const swControl = spec['TeqFw_Web_Front_Model_Sw_Control$'];

    const template = `
<div>
    <lang/>
    <push/>
    <q-btn :label="$t('btn.ok')" v-on:click="getStatus"></q-btn>
    <q-btn :label="$t('btn.disable')" v-on:click="cacheDisable"></q-btn>
    <q-btn :label="$t('btn.enable')" v-on:click="cacheEnable"></q-btn>
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
        components: {lang, push},
        methods: {
            async getStatus() {
                const res = await swControl.getCacheStatus();
                console.log(`cache status: ${res}`);
            },
            async cacheDisable() {
                const res = await swControl.setCacheStatus(false);
            },
            async cacheEnable() {
                const res = await swControl.setCacheStatus(true);
            }
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
