/**
 * Frontend application for 'pub' realm.
 *
 * @namespace Fl32_Bwl_Front_Area_Pub_App
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Area_Pub_App';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Area_Pub_App
 * @returns {Fl32_Bwl_Front_Area_Pub_App.vueCompTmpl}
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Shared_Defaults} */
    const DEF = spec['Fl32_Bwl_Shared_Defaults$'];    
    /** @type {TeqFw_Di_Container} */
    const container = spec['TeqFw_Di_Container$']; 
    const router = spec[DEF.MOD_VUE.DI_ROUTER];  
    const app = spec[DEF.MOD_VUE.DI_APP];  
    /** @type {TeqFw_Core_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_Front_Widget_Layout_Centered$'];    // vue comp tmpl
    /** @type {Fl32_Bwl_Front_Layout_Pub} */
    const layoutMain = spec['Fl32_Bwl_Front_Layout_Pub$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<layout-main></layout-main>
`;

    // MAIN FUNCTIONALITY
    // add global available components
    app.component('LayoutCentered', layoutCentered);

    // setup application routes
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_DEV_LOGIN,
        component: () => container.get('Fl32_Bwl_Front_Area_Pub_Route_Dev_Login$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_FRIENDS,
        component: () => container.get('Fl32_Bwl_Front_Area_Pub_Route_Friends$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_FRIENDS_ADD,
        component: () => container.get('Fl32_Bwl_Front_Area_Pub_Route_Friends_Add$'),
        props: true,
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_HISTORY,
        component: () => container.get('Fl32_Bwl_Front_Area_Pub_Route_History$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_HOME,
        component: () => container.get('Fl32_Bwl_Front_Area_Pub_Route_Home$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_SETTINGS,
        component: () => container.get('Fl32_Bwl_Front_Area_Pub_Route_Settings$')
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_SIGN_IN_CODE_CHECK,
        component: () => container.get('Fl32_Bwl_Front_Area_Pub_Route_SignIn_Code_Check$'),
        props: true,
    });
    router.addRoute({
        path: DEF.REALM_PUB_ROUTE_SIGN_IN_CODE_GET,
        component: () => container.get('Fl32_Bwl_Front_Area_Pub_Route_SignIn_Code_Get$')
    });
    app.use(router);

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Area_Pub_App
     */
    return {
        name: NS,
        template,
        components: {layoutMain},
    };
}


// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
