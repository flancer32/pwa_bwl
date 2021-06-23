/**
 * Route widget for developer's sign in.
 *
 * @namespace Fl32_Bwl_Front_Area_Pub_Route_Dev_Login
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Area_Pub_Route_Dev_Login';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Area_Pub_Route_Dev_Login
 * @returns {Fl32_Bwl_Front_Area_Pub_Route_Dev_Login.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$']; // singleton
    /** @type {TeqFw_Core_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_Front_Widget_Layout_Centered$'];    // vue comp tmpl
    /** @type {Fl32_Teq_User_Front_Widget_SignIn} */
    const userSignIn = spec['Fl32_Teq_User_Front_Widget_SignIn$'];  // vue comp tmpl
    /** @type {typeof Fl32_Teq_User_Front_Widget_SignIn_Props} */
    const SignInProps = spec['Fl32_Teq_User_Front_Widget_SignIn#Props'];  // class

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
     * @memberOf Fl32_Bwl_Front_Area_Pub_Route_Dev_Login
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
        methods: {
            onFailure() {
                console.log('Failure');
            },
            async onSuccess() {
                this.$router.push(session.getRouteToRedirect());
            },
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
