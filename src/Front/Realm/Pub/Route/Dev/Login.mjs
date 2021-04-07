/**
 * Route widget for developer's sign in.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_Route_Dev_Login
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_Route_Dev_Login';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Dev_Login
 * @returns {Fl32_Bwl_Front_Realm_Pub_Route_Dev_Login.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$'];    // vue comp tmpl
    /** @type {Fl32_Teq_User_Front_Widget_SignIn} */
    const userSignIn = spec['Fl32_Teq_User_Front_Widget_SignIn$'];  // vue comp tmpl
    /** @type {typeof Fl32_Teq_User_Front_Widget_SignIn_Props} */
    const SignInProps = spec['Fl32_Teq_User_Front_Widget_SignIn#Props'];  // class
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div style="display: grid; gap: calc(var(--grid-gap)*5); justify-items: center;">
        <div>Authentication</div>
        <user-sign-in
                :data="signIn"
                @onSuccess="onSuccess($event)"
                @onFailure="onFailure($event)"
        ></user-sign-in>
<!--        <div style="display: grid; gap: var(&#45;&#45;grid-gap); grid-auto-flow: column;" >-->
<!--            <q-btn to="/password/restore" label="Restore Password" size="xs" />-->
<!--            <q-btn to="/sign/up" label="Sign Up" size="xs" />        -->
<!--        </div>    -->
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
     * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Dev_Login
     */
    return {
        name: NS,
        template,
        components: {layoutCentered, userSignIn},
        data: function () {
            return {
                signIn: new SignInProps(),
            };
        },
        computed: {
            ...mapState({
                stateUserAuthenticated: state => state.user.authenticated,
            })
        },
        methods: {
            onFailure() {
                console.log('Failure');
            },
            async onSuccess() {
                // session is initiated in 'Fl32_Teq_User_Front_Widget_SignIn' before @success event.
                const user = session.getUser();
                this.setStateUserAuthenticated(user);
                this.$router.push('/');
            },
            ...mapMutations({
                setStateUserAuthenticated: 'user/setAuthenticated',
            }),
        },
        mounted() {
            const user = session.getUser();
            this.setStateUserAuthenticated(user);
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
