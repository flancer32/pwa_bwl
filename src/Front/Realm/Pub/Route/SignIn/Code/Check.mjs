/**
 * Route widget for user's sign in with one-time code.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_Route_SignIn_Code_Check
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_Route_SignIn_Code_Check';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_SignIn_Code_Check
 * @returns {Fl32_Bwl_Front_Realm_Pub_Route_SignIn_Code_Check.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION]; // named singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$']; // vue comp tmpl
    /** @function {@type Fl32_Bwl_Front_Gate_Sign_In_Code_Check.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Sign_In_Code_Check$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Request} */
    const Req = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check#Request']; // class
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div class="t-grid rows gutter-md" style="padding: var(--padding-grid);">
        <div style="text-align: center">{{$t('pub:route.signIn.code.check.title')}}</div>
        <div style="text-align: center" v-show="error">{{error}}</div>
    </div>
</layout-centered>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_SignIn_Code_Check
     */
    return {
        name: NS,
        template,
        components: {layoutCentered},
        data: function () {
            return {
                error: null
            };
        },
        props: {
            code: String,
        },
        computed: {
            ...mapState({
                stateUserAuthenticated: state => state.user.authenticated,
            })
        },
        methods: {
            ...mapMutations({
                setStateUserAuthenticated: 'user/setAuthenticated',
            }),
        },
        async mounted() {
            const req = new Req();
            req.code = this.code;
            /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Response} */
            const res = await gate(req);
            if (res.constructor.name === 'TeqFw_Core_App_Front_Gate_Response_Error') {
                this.error = res.message;
            } else {
                await session.init();
                const route = session.getRouteToRedirect();
                this.$router.push(route);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
