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
    /** @function {@type Fl32_Bwl_Front_Gate_Sign_In_Code_Send.gate} */
    const gateSend = spec['Fl32_Bwl_Front_Gate_Sign_In_Code_Send$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Request} */
    const ReqSend = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send#Request']; // class
    /** @type {typeof Fl32_Teq_User_Shared_Api_Data_User} */
    const DUser = spec['Fl32_Teq_User_Shared_Api_Data_User#']; // class
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div class="t-grid rows gutter-md" style="padding: var(--padding-grid);">
        <div>{{$t('pub:route.signIn.code.check.title')}}</div>
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
            return {};
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
        created() {
            // get user data from session and save it to the app state
            const user = session.getUser();
            this.setStateUserAuthenticated(user);
            // redirect authenticated user to (default) route
            if (user instanceof DUser) {
                const route = session.getRouteToRedirect();
                this.$router.push(route);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
