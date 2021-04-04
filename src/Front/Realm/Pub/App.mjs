/**
 * Frontend application for 'pub' realm.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_App
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_App';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_App
 * @returns {Fl32_Bwl_Front_Realm_Pub_App.vueCompTmpl}
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
    const router = spec[DEF.MOD_VUE.DI_ROUTER];  // named singleton
    const app = spec[DEF.MOD_VUE.DI_APP];  // named singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$'];    // Vue component singleton
    /** @type {Fl32_Bwl_Front_Layout_Pub} */
    const layoutMain = spec['Fl32_Bwl_Front_Layout_Pub$']; // Vue component singleton

    // DEFINE WORKING VARS
    const template = `
<layout-main></layout-main>
`;

    // MAIN FUNCTIONALITY
    // add global available components
    app.component('LayoutCentered', layoutCentered);

    // setup application routes
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_FRIENDS,
        component: () => container.get('Fl32_Bwl_Front_Realm_Pub_Route_Friends$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_HISTORY,
        component: () => container.get('Fl32_Bwl_Front_Realm_Pub_Route_History$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_HOME,
        component: () => container.get('Fl32_Bwl_Front_Realm_Pub_Route_Home$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_SETTINGS,
        component: () => container.get('Fl32_Bwl_Front_Realm_Pub_Route_Settings$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_SIGN_IN,
        component: () => container.get('Fl32_Bwl_Front_Realm_Pub_Route_Sign_In$')
    });
    app.use(router);

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Pub_App
     */
    return {
        name: NS,
        template,
        components: {layoutMain},
    };
}


// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
