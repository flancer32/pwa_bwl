const template = `
<layout-centered>
    <div style="display: grid; gap: calc(var(--grid-gap)*5); justify-items: center;">
        <div>Authentication</div>
        <user-sign-in
                :data="signIn"
                @onSuccess="onSuccess($event)"
                @onFailure="onFailure($event)"
        ></user-sign-in>
        <div style="display: grid; gap: var(--grid-gap); grid-auto-flow: column;" >
            <q-btn to="/password/restore" label="Restore Password" size="xs" />
            <q-btn to="/sign/up" label="Sign Up" size="xs" />        
        </div>    
    </div>
</layout-centered>
`;

export default function Fl32_Bwl_Front_Route_Sign_In(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$'];    // Vue component singleton
    /** @type {Fl32_Teq_User_Front_Widget_SignIn} */
    const userSignIn = spec['Fl32_Teq_User_Front_Widget_SignIn$'];  // Vue component singleton
    /** @type {typeof Fl32_Teq_User_Front_Widget_SignIn_Props} */
    const SignInProps = spec['Fl32_Teq_User_Front_Widget_SignIn#Props'];  // class constructor
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    return {
        name: 'RouteSignIn',
        template,
        components: {layoutCentered, userSignIn},
        data: function () {
            return {
                out: 'Fl32_Bwl_Front_App',
                signIn: new SignInProps(),
            };
        },
        computed: {
            url() {
                return './img/moon.png';
            },
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
