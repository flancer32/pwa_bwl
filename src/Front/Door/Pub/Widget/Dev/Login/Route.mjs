/**
 * Route widget for developer's sign in.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_Dev_Login_Route
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_Dev_Login_Route';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Dev_Login_Route
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_Dev_Login_Route.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {Fl32_Bwl_Front_Layout_Centered} */
    const layoutCentered = spec['Fl32_Bwl_Front_Layout_Centered$'];
    /** @type {Fl32_Teq_User_Front_Widget_SignIn} */
    const userSignIn = spec['Fl32_Teq_User_Front_Widget_SignIn$'];
    /** @type {typeof Fl32_Teq_User_Front_Widget_SignIn_Props} */
    const SignInProps = spec['Fl32_Teq_User_Front_Widget_SignIn#Props'];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div class="t-grid gutter-lg text-center">
        <div>Authentication</div>
        <user-sign-in
                :data="signIn"
                @onSuccess="onSuccess($event)"
                @onFailure="onFailure($event)"
        ></user-sign-in>
    </div>
</layout-centered>
`;
    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Dev_Login_Route
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

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
