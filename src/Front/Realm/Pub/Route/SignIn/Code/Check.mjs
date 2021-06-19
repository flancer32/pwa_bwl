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
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$']; // singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$']; // vue comp tmpl
    /** @function {@type Fl32_Bwl_Front_Gate_Sign_In_Code_Check.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Sign_In_Code_Check$']; // function singleton
    /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Factory} */
    const factRoute = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check#Factory$']; // singleton


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
        async mounted() {
            const req = factRoute.createReq();
            req.code = this.code;
            /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check.Response} */
            const res = await gate(req);
            if (res.constructor.name === 'TeqFw_Core_App_Front_Gate_Response_Error') {
                this.error = res.message;
            } else {
                debugger
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
