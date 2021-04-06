/**
 * Route widget for user's sign in.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_Route_Sign_In
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_Route_Sign_In';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Sign_In
 * @returns {Fl32_Bwl_Front_Realm_Pub_Route_Sign_In.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION]; // named singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$']; // vue comp tmpl
    /** @type {typeof Fl32_Teq_User_Shared_Api_Data_User} */
    const DUser = spec['Fl32_Teq_User_Shared_Api_Data_User#']; // class
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div class="t-grid rows gutter-md" style="padding: var(--padding-grid);" v-show="!displayMsg">
        <div>{{$t('pub:route.sign.in.title')}}</div>
        <div>
            <q-input class="id-email"
                     :hint="$t('sign:up.email.hint')"
                     :label="$t('sign:up.email.label')"
                     :loading="loading"
                     :stack-label="true"
                     autocomplete="email"
                     bottom-slots
                     outlined
                     v-model="fldEmail"
            ></q-input>
            <div class="actions">
                <q-btn :label="$t('btn:submit')"
                       :disabled="loading"
                       color="primary"
                       v-on:click="onSubmit"
                ></q-btn>
            </div>
        </div>
    </div>
    <div v-show="displayMsg">
        <div>{{msg}}</div>
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
     * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Sign_In
     */
    return {
        name: NS,
        template,
        components: {layoutCentered},
        data: function () {
            return {
                displayMsg: false,
                fldEmail: null,
                loading: false,
                msg: null,
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
            onSubmit() {
                this.loading = true;
                setInterval(() => {
                    this.loading = false;
                    this.displayMsg = true;
                    this.msg = this.$t('pub:route.sign.in.msg.success');
                }, 1000);
            },
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
