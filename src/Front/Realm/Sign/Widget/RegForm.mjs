/**
 * Registration form (step 1) to get authentication data.
 *
 * @namespace Fl32_Bwl_Front_Realm_Sign_Widget_RegForm
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Sign_Widget_RegForm';
const EVT_SUBMIT = 'onSubmit';
const TIMEOUT = 1000;
const GENDER_XX = 'woman';
const GENDER_XY = 'notWoman';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Sign_Widget_RegForm
 * @returns {Fl32_Bwl_Front_Realm_Sign_Widget_RegForm.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const {isEmpty} = spec['TeqFw_Core_App_Shared_Util']; // ES6 module destructing
    /** @function {@type Fl32_Teq_User_Front_Gate_Check_Existence.gate} */
    const gateCheckExist = spec['Fl32_Teq_User_Front_Gate_Check_Existence$']; // singleton function
    /** @type {typeof Fl32_Teq_User_Shared_Service_Route_Check_Existence.Request} */
    const ReqCheckExist = spec['Fl32_Teq_User_Shared_Service_Route_Check_Existence#Request']; // class
    /** @function {@type Fl32_Bwl_Front_Gate_Sign_Up.gate} */
    const gateSignUp = spec['Fl32_Bwl_Front_Gate_Sign_Up$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Sign_Up.Request} */
    const ReqSignUp = spec['Fl32_Bwl_Shared_Service_Route_Sign_Up#Request']; // class

    // DEFINE WORKING VARS
    const template = `
<q-form class="t-grid rows gutter-sm"
        @submit="onSubmit"
        ref="regForm"
>
    <q-input class="id-name"
             :hint="$t('route.signUp.name.hint')"
             :label="$t('route.signUp.name.label') + ' *'"
             :rules="rulesName"
             :stack-label="true"
             outlined
             v-model="fldName"
    ></q-input>

    <q-input class="id-email"
             :error-message="errorMsg['email']"
             :error="error['email']"
             :hint="$t('route.signUp.email.hint')"
             :label="$t('route.signUp.email.label') + ' *'"
             :loading="loading['email']"
             :rules="rulesEmail"
             :stack-label="true"
             autocomplete="email"
             bottom-slots
             outlined
             v-model="fldEmail"
    ></q-input>

    <q-input class="id-phone"
             :error-message="errorMsg['phone']"
             :error="error['phone']"
             :hint="$t('route.signUp.phone.hint')"
             :label="$t('route.signUp.phone.label')"
             :loading="loading['phone']"
             :stack-label="true"
             autocomplete="phone"
             bottom-slots
             outlined
             v-model="fldPhone"
    ></q-input>

    <q-field class="id-gender"
             :stack-label="true"
             :rules="rulesGender"
             :value="fldGender"
             :hint="$t('route.signUp.gender.hint')"
             :label="$t('route.signUp.gender.label') + ' *'"
             borderless
    >
        <div class="t-grid cols gutter-none" style="width: 100%">
            <q-radio
                    :label="$t('route.signUp.gender.XX.label')"
                    color="pink"
                    v-model="fldGender"
                    val="${GENDER_XX}"
            ></q-radio>
            <q-radio
                    :label="$t('route.signUp.gender.XY.label')"
                    color="light-blue"
                    v-model="fldGender"
                    val="${GENDER_XY}"
            ></q-radio>
        </div>
    </q-field>

    <q-input class="id-age"
             :hint="$t('route.signUp.age.hint')"
             :label="$t('route.signUp.age.label') + ' *'"
             :rules="rulesNum"
             :stack-label="true"
             outlined
             type="number"
             v-model="fldAge"
    ></q-input>

    <q-input class="id-height"
             :hint="$t('route.signUp.height.hint')"
             :label="$t('route.signUp.height.label') + ' *'"
             :rules="rulesNum"
             :stack-label="true"
             outlined
             type="number"
             v-model="fldHeight"
    ></q-input>

    <q-input class="id-weight"
             :hint="$t('route.signUp.weight.hint')"
             :label="$t('route.signUp.weight.label') + ' *'"
             :rules="rulesNum"
             :stack-label="true"
             outlined
             step="0.1"
             type="number"
             v-model="fldWeight"
    ></q-input>

    <div class="actions">
        <q-btn :label="$t('btn.submit')" :disabled="disableSubmit" type="submit" color="primary"></q-btn>
    </div>
</q-form>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Sign_Widget_RegForm
     */
    return {
        name: NS,
        template,
        data: function () {
            return {
                error: {email: false, phone: false},
                errorMsg: {email: '', phone: ''},
                fldAge: null,
                fldEmail: null,
                fldGender: null,
                fldHeight: null,
                fldName: null,
                fldPhone: null,
                fldWeight: null,
                loading: {email: false, phone: false},
                timer: {},
                disabledSubmit: true, // computed field does not work with 'submit' button
            };
        },
        props: {
            refCode: null
        },
        computed: {
            disableSubmit() {
                const emailEmpty = isEmpty(this.fldEmail);
                const existenceErr = this.error.email || this.error.phone;
                return emailEmpty || existenceErr;
            },
            rulesEmail() {
                return [
                    val => val !== null && val !== '' || this.$t('route.signUp.err.required'),
                ];
            },
            rulesGender() {
                return [
                    () => this.fldGender !== undefined && this.fldGender !== null || this.$t('route.signUp.err.required'),
                ];
            },
            rulesName() {
                return [
                    val => val !== null && val !== '' || this.$t('route.signUp.err.required'),
                ];
            },
            rulesNum() {
                return [
                    val => val !== null && val !== '' || this.$t('route.signUp.err.required'),
                    val => val > 0 && val < 300 || this.$t('route.signUp.err.wrongValue')
                ];
            }
        },
        methods: {
            /**
             * Send request to server to check data existence.
             *
             * @param {String} value
             * @param {String} type @see Fl32_Teq_User_Shared_Service_Route_Check_Existence_Request.TYPE_...
             * @param {Boolean} fireError 'true' - error on exist (for `email`), 'false' - otherwise (for `refCode`)
             * @param {String} msg i18n-key for error message
             * @returns {Promise<void>}
             */
            async checkExistence(value, type, fireError, msg) {
                const me = this;
                me.error[type] = false;
                // create function to execute checking
                const fn = async function () {
                    if (value) {
                        me.loading[type] = true;
                        const req = new ReqCheckExist();
                        req.type = type;
                        req.value = value;
                        /** @type {Fl32_Teq_User_Shared_Service_Route_Check_Existence.Response} */
                        const res = await gateCheckExist(req);
                        me.loading[type] = false;
                        if (res.exist === fireError) {
                            me.error[type] = true;
                            me.errorMsg[type] = me.$t(msg);
                        }
                    }
                    clearTimeout(me.timer[type]);    // clear previous timer, if exists
                };
                // deferred execution
                clearTimeout(this.timer[type]);    // clear previous timer, if exists
                this.timer[type] = setTimeout(fn, TIMEOUT);
            },
            async onSubmit() {
                // code smell: we should return data to the parent component and process data from there
                const req = new ReqSignUp();
                req.refCode = this.refCode;
                req.name = this.fldName;
                req.email = this.fldEmail;
                req.phone = this.fldPhone;
                req.isFemale = this.fldGender === GENDER_XX;
                req.age = this.fldAge;
                req.height = this.fldHeight;
                req.weight = this.fldWeight;
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_Up.Response} */
                const res = await gateSignUp(req);
                if (res.sessionId) {
                    self.window.location.href = `/${DEF.REALM_PUB}/`;
                }
            },
        },
        watch: {
            fldEmail(current) {
                this.checkExistence(current, ReqCheckExist.TYPE_EMAIL, true, 'route.signUp.err.emailExists');
            },
            fldPhone(current) {
                this.checkExistence(current, ReqCheckExist.TYPE_PHONE, true, 'route.signUp.err.phoneExists');
            },
        },
        emits: [EVT_SUBMIT],
        mounted() { },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
