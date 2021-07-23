/**
 * Route widget to get email with one-time code for user sign in.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Get
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Get';
const TIMEOUT = 3000;

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Get
 * @returns {Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Get.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {TeqFw_Core_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_Front_Widget_Layout_Centered$'];
     /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Factory} */
    const route = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send#Factory$'];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div class="t-grid rows gutter-md" style="padding: var(--padding-grid);" v-show="!displayMsg">
        <div>{{$t('route.signIn.code.get.title')}}</div>
        <div>
            <q-input class="id-email"
                     :hint="$t('route.signIn.code.get.email.hint')"
                     :label="$t('route.signIn.code.get.email.label')"
                     :loading="loading"
                     :stack-label="true"
                     autocomplete="email"
                     bottom-slots
                     outlined
                     v-model="fldEmail"
            ></q-input>
            <div class="actions">
                <q-btn :label="$t('btn.submit')"
                       :disabled="loading"
                       color="primary"
                       v-on:click="onSubmit"
                ></q-btn>
            </div>
        </div>
    </div>
    <div v-show="displayMsg" style="padding: var(--padding-grid); text-align: center">
        <div>{{msg}}</div>
    </div>
</layout-centered>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Route_SignIn_Code_Get
     */
    return {
        teq: {package: DEF.SHARED.NAME},
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
        methods: {
            async onSubmit() {
                this.loading = true;
                const req = route.createReq();
                req.email = this.fldEmail;
                // noinspection JSValidateTypes
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Response} */
                const res = await gate.send(req, route);
                this.loading = false;
                const opts = {email: this.fldEmail};
                if (res.isSent) {
                    this.msg = this.$t('route.signIn.code.get.msg.success', opts);
                } else {
                    this.msg = this.$t('route.signIn.code.get.msg.failure', opts);
                }
                this.displayMsg = true;
                setTimeout(() => {
                    this.displayMsg = false;
                    this.fldEmail = null
                }, TIMEOUT);
            },
        },
        created() {
            // redirect authenticated user to (default) route
            if (session.checkUserAuthenticated(this.$router)) {
                const route = session.getRouteToRedirect();
                this.$router.push(route);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
