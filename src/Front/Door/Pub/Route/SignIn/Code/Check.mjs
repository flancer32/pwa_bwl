/**
 * Route widget for user's sign in with one-time code.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Check
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Check';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Check
 * @returns {Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Check.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {Fl32_Bwl_Front_Layout_Centered} */
    const layoutCentered = spec['Fl32_Bwl_Front_Layout_Centered$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Factory} */
    const route = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check#Factory$'];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div class="t-grid rows gutter-md" style="padding: var(--padding-grid);">
        <div style="text-align: center">{{$t('pub:route.signIn.code.check.title')}}</div>
        <div style="text-align: center" v-show="error">{{error}}</div>
    </div>
</layout-centered>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Check
     */
    return {
        teq: {package: DEF.SHARED.NAME},
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
        async mounted() {
            const req = route.createReq();
            req.code = this.code;
            // noinspection JSValidateTypes
            /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Response} */
            const res = await gate.send(req, route);
            if (res) {
                await session.init();
                const route = session.getRouteToRedirect();
                this.$router.push(route);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
