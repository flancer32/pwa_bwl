/**
 * Frontend application for 'sign' realm.
 *
 * @namespace Fl32_Bwl_Front_Realm_Sign_App
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Sign_App';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Sign_App
 * @returns {Fl32_Bwl_Front_Realm_Sign_App.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
    const router = spec[DEF.MOD_VUE.DI_ROUTER];  // named singleton
    const app = spec[DEF.MOD_VUE.DI_APP];  // named singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$'];    // Vue component singleton
    /** @type {Fl32_Bwl_Front_Layout_Sign} */
    const layoutMain = spec['Fl32_Bwl_Front_Layout_Sign$']; // Vue component singleton

    // DEFINE WORKING VARS
    const template = `
<layout-main></layout-main>
`;

    // MAIN FUNCTIONALITY
    // add global available components
    app.component('LayoutCentered', layoutCentered);

    // setup application routes
    router.addRoute({path: DEF.ROUTE_HOME, component: () => container.get('Fl32_Bwl_Front_Realm_Sign_Route_Home$')});

    app.use(router);

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Sign_App
     */
    return {
        name: NS,
        template,
        components: {layoutMain},
        data() {
            return {};
        },
        computed: {
            isAuthenticated() {
                return false;
            }
        },
        methods: {},
        mounted() {
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
