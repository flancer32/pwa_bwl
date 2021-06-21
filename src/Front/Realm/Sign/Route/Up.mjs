/**
 * Registration route (/up) for 'sign' realm.
 *
 * @namespace Fl32_Bwl_Front_Realm_Sign_Route_Up
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Sign_Route_Up';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Sign_Route_Up
 * @returns {Fl32_Bwl_Front_Realm_Sign_Route_Up.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    const {formatUtcTime, isEmpty} = spec['TeqFw_Core_App_Shared_Util']; // ES6 module destructing
    /** @type {Fl32_Bwl_Front_Realm_Sign_Widget_RegForm} */
    const regForm = spec['Fl32_Bwl_Front_Realm_Sign_Widget_RegForm$'];
    /** @function {@type Fl32_Teq_User_Front_Gate_RefLink_Get.gate} */
    const gateGet = spec['Fl32_Teq_User_Front_Gate_RefLink_Get$']; // singleton
    /** @type { Fl32_Teq_User_Shared_Service_Route_RefLink_Get.Factory} */
    const fGet = spec['Fl32_Teq_User_Shared_Service_Route_RefLink_Get#Factory$']; // singleton

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid">
    <div v-show="displayError===true">Some error is occurred.</div>
    <div v-show="displayError===false">
        <q-card style="min-width: 350px">
            <q-card-section class="t-grid cols gutter-md align-items-center" style="grid-template-columns: auto 1fr">
                <q-input class="id-parent"
                    :label="$t('route.signUp.parent')"
                    :stack-label="true"
                    outlined
                    readonly
                    v-model="outParentName"
                ></q-input>
                <q-input class="id-parent"
                    :label="$t('route.signUp.time')"
                    :stack-label="true"
                    outlined
                    readonly
                    v-model="outTime"
                ></q-input>
            </q-card-section>
            <q-card-section class="t-grid gutter-md align-items-center">
                <reg-form
                    :refCode="refCode"
                ></reg-form>
            </q-card-section>
        </q-card>
    </div>
</div>
`;

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Sign_Route_Up
     */
    return {
        name: NS,
        template,
        components: {regForm},
        data: function () {
            return {
                displayError: null,
                parent: null,
                timeLeft: null,
                timerTimeLeft: null,
            };
        },
        props: {
            refCode: String, // "/.../:refCode" - referral code to compose users tree (see DEF.REALM_SIGN_ROUTE_UP)
        },
        computed: {
            outParentName() {
                return this.parent?.name ?? '';
            },
            outTime() {
                let result = '00:00:00';
                const time = new Date(this.timeLeft);
                result = formatUtcTime(time);
                return result;
            },
        },
        async mounted() {
            const me = this;
            if (isEmpty(this.refCode)) {
                console.log('error');
            } else {
                console.log(this.refCode);
                const req = fGet.createReq();
                req.code = this.refCode;
                /** @type {Fl32_Teq_User_Shared_Service_Route_RefLink_Get.Response} */
                const res = await gateGet(req);
                if (res.link?.refCode === this.refCode) {
                    this.parent = res.link.parent;
                    me.timeLeft = (new Date(res.link.dateExpired)).getTime() - (new Date()).getTime();
                    this.timerTimeLeft = setInterval(() => {
                        me.timeLeft = (new Date(res.link.dateExpired)).getTime() - (new Date()).getTime();
                        if (me.timeLeft <= 0) {
                            clearInterval(me.timerTimeLeft);
                        }
                    }, 1000);
                    this.displayError = false;
                } else {
                    this.parent = null;
                    this.displayError = true;
                }
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
