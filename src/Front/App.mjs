const template = `
<layout-main></layout-main>
`;

export default function Fl32_Bwl_Front_App(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
    const router = spec[DEF.MOD_VUE.DI_ROUTER];  // named singleton
    const app = spec[DEF.MOD_VUE.DI_APP];  // named singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$'];    // Vue component singleton
    /** @type {Fl32_Bwl_Front_Layout_Base} */
    const layoutMain = spec['Fl32_Bwl_Front_Layout_Base$']; // Vue component singleton

    // add global available components
    app.component('LayoutCentered', layoutCentered);

    // setup application routes
    router.addRoute({path: DEF.ROUTE_FRIENDS, component: () => container.get('Fl32_Bwl_Front_Route_Friends$')});
    router.addRoute({path: DEF.ROUTE_HISTORY, component: () => container.get('Fl32_Bwl_Front_Route_History$')});
    router.addRoute({path: DEF.ROUTE_HOME, component: () => container.get('Fl32_Bwl_Front_Route_Home$')});
    router.addRoute({path: DEF.ROUTE_SETTINGS, component: () => container.get('Fl32_Bwl_Front_Route_Settings$')});
    router.addRoute({path: DEF.ROUTE_SIGN_IN, component: () => container.get('Fl32_Bwl_Front_Route_Sign_In$')});
    router.addRoute({
        path: DEF.ROUTE_SIGN_UP,
        props: true,
        component: () => container.get('Fl32_Bwl_Front_Route_Sign_Up$')
    });
    router.addRoute({
        path: DEF.ROUTE_SIGN_UP_INIT,
        component: () => container.get('Fl32_Bwl_Front_Route_Sign_Up_Init$')
    });
    app.use(router);

    return {
        name: 'FrontApp',
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
