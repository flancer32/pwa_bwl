/**
 * Registration route (/up) for 'sign' realm.
 *
 * @namespace Fl32_Bwl_Front_Area_Sign_Route_Up
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Area_Sign_Route_Up';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Area_Sign_Route_Up
 * @returns {Fl32_Bwl_Front_Area_Sign_Route_Up.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    const {formatUtcTime, isEmpty} = spec['TeqFw_Core_Shared_Util'];
    /** @type {Fl32_Bwl_Front_Area_Sign_Widget_RegForm} */
    const regForm = spec['Fl32_Bwl_Front_Area_Sign_Widget_RegForm$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Teq_User_Shared_Service_Route_RefLink_Get.Factory} */
    const route = spec['Fl32_Teq_User_Shared_Service_Route_RefLink_Get#Factory$'];

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
     * @memberOf Fl32_Bwl_Front_Area_Sign_Route_Up
     */
    return {
        teq: {package: DEF.SHARED.NAME},
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
                const req = route.createReq();
                req.code = this.refCode;
                // noinspection JSValidateTypes
                /** @type {Fl32_Teq_User_Shared_Service_Route_RefLink_Get.Response} */
                const res = await gate.send(req, route);
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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
