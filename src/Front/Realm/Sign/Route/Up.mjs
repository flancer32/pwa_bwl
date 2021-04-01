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
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];
    const {formatUtcTime, isEmpty} = spec['TeqFw_Core_App_Shared_Util']; // ES6 module destructing
    /** @type {Fl32_Bwl_Front_Realm_Sign_Widget_RegForm} */
    const regForm = spec['Fl32_Bwl_Front_Realm_Sign_Widget_RegForm$'];
    /** @function {@type Fl32_Teq_User_Front_Gate_RefLink_Get.gate} */
    const gateGet = spec['Fl32_Teq_User_Front_Gate_RefLink_Get$']; // function singleton
    /** @type {typeof Fl32_Teq_User_Shared_Service_Route_RefLink_Get_Request} */
    const ReqGet = spec['Fl32_Teq_User_Shared_Service_Route_RefLink_Get#Request']; // class constructor

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid">
    <div v-show="displayError===true">Some error is occurred.</div>
    <div v-show="displayError===false">
        <q-card style="min-width: 350px">
            <q-card-section class="t-grid gutter-md align-items-center">
                <div>{{$t('sign:up.parent')}}: {{parent?.name}}</div>
                <div>{{$t('sign:up.time')}}: {{timeFormatted}}</div>
            </q-card-section>
            <q-card-section class="t-grid gutter-md align-items-center">
                <reg-form></reg-form>
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
            timeFormatted() {
                let result = '00:00:00';
                const time = new Date(this.timeLeft);
                result = formatUtcTime(time);
                return result;
            },
            ...mapState({
                stateTitle: state => state.title,
                stateUserAuthenticated: state => state.user.authenticated,
            })
        },
        methods: {
            ...mapMutations({
                setStateUserAuthenticated: 'user/setAuthenticated',
            }),
        },
        async mounted() {
            const me = this;
            if (isEmpty(this.refCode)) {
                console.log('error');
            } else {
                console.log(this.refCode);
                const req = new ReqGet();
                req.code = this.refCode;
                /** @type {Fl32_Teq_User_Shared_Service_Route_RefLink_Get_Response} */
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