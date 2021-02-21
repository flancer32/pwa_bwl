const template = `
<p>{{out}}</p>
`;

export default function Vendor_Project_Front_App(spec) {
    /** @type {Vendor_Project_Defaults} */
    const DEF = spec['Vendor_Project_Defaults$'];    // instance singleton
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.DI_CONTAINER]; // named singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    const router = spec[DEF.MOD_VUE.DI_ROUTER];  // named singleton
    const app = spec[DEF.MOD_CORE.DI_APP];  // named singleton

    /** @type {Vendor_Project_Front_Layout_Main} */
    const layoutMain = spec['Vendor_Project_Front_Layout_Main$'];    // Vue component singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$'];    // Vue component singleton
    const mapMutations = spec[DEF.MOD_VUE.DI_VUEX].mapMutations;
    const mapState = spec[DEF.MOD_VUE.DI_VUEX].mapState;

    // add global available components
    app.component('LayoutCentered', layoutCentered);

    // setup application routes
    // router.addRoute({path: '/', component: () => container.get('Vendor_Project_Front_Route_Home$')});
    // router.addRoute({path: '/sign/in', component: () => container.get('Vendor_Project_Front_Route_Sign_In$')});
    app.use(router);

    return {
        name: 'FrontApp',
        template,
        components: {userSignUp},
        data: function () {
            return {
                out: 'Vendor_Project_Front_App',
            };
        },
        computed: {},
        methods: {},
        mounted() {
        },
    };
}
