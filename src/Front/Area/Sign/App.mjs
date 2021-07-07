/**
 * Frontend application for 'sign' realm.
 *
 * @namespace Fl32_Bwl_Front_Area_Sign_App
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Area_Sign_App';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Area_Sign_App
 * @returns {Fl32_Bwl_Front_Area_Sign_App.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Shared_Defaults} */
    const DEF = spec['Fl32_Bwl_Shared_Defaults$'];    
    /** @type {TeqFw_Di_Container} */
    const container = spec['TeqFw_Di_Container$']; 
    const router = spec[DEF.MOD_VUE.DI_ROUTER];  
    const app = spec[DEF.MOD_VUE.DI_APP];  
    /** @type {TeqFw_Core_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_Front_Widget_Layout_Centered$'];    // vue comp tmpl
    /** @type {Fl32_Bwl_Front_Layout_Sign} */
    const layoutMain = spec['Fl32_Bwl_Front_Layout_Sign$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<layout-main></layout-main>
`;

    // MAIN FUNCTIONALITY
    // add global available components
    app.component('LayoutCentered', layoutCentered);

    // setup application routes
    router.addRoute({
        path: DEF.REALM_SIGN_ROUTE_HOME,
        component: () => container.get('Fl32_Bwl_Front_Area_Sign_Route_Home$')
    });
    router.addRoute({
        path: DEF.REALM_SIGN_ROUTE_UP,
        props: true,
        component: () => container.get('Fl32_Bwl_Front_Area_Sign_Route_Up$')
    });

    app.use(router);

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Area_Sign_App
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
