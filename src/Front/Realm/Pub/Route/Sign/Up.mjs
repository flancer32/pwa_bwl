const I18N_BUNDLE = {
    registered: 'You are registered!',
};
const TIMEOUT = 4000;
const template = `
<layout-centered>
    <user-sign-up
            v-show="!showInterim"
            :input="signUp"
            @onSuccess="onSuccess($event)"
            @onFailure="onFailure($event)"
    ></user-sign-up>
    <div style="width: 75vw; height: 75vh;" v-show="showInterim">
        <q-img
                src="./img/2girls.jpg"
                style="width: 100%; height: 100%"
                fit="scale-down">
            <div class="absolute-top text-center">
                {{$t('registered')}}
            </div>
        </q-img>
    </div>
</layout-centered>
`;

/* Overwrite template for Fl32_Teq_User_Front_Widget_SignUp */
const tmplSignUp = `
<form class="teqUserSignUp" onsubmit="return false">
    <q-input class="id-name"
        :label="$t('teqUser:name')"
        bottom-slots
        outlined
        v-model="fldName"
    ></q-input>
    <q-input class="id-email" 
        :error-message="error['email']"
        :error="invalid['email']"
        :label="$t('teqUser:email')"
        :loading="loading['email']"
        autocomplete="email"
        bottom-slots
        outlined
        v-model="fldEmail"
    ></q-input>
    <q-input class="id-password"
        :error-message="error['password']"
        :error="invalid['password']"
        :label="$t('teqUser:password')"
        :type="isPwd ? 'password' : 'text'"
        autocomplete="new-password"
        bottom-slots
        outlined
        type="password"
        v-model="fldPassword"
    >
            <template v-slot:append>
            <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
            ></q-icon>
        </template>
    </q-input>
    <div class="actions">
        <q-btn v-on:click="actSubmit()" :disabled="disabledSubmit" :label="$t('teqUser:submit')"></q-btn>
    </div>
</form>
`;

export default function Fl32_Bwl_Front_Realm_Pub_Route_Sign_Up(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    const i18next = spec[DEF.MOD_CORE.DI_I18N];   // named singleton
    const {isEmpty} = spec['TeqFw_Core_App_Shared_Util']; // ES6 module destructing
    /** @type {Fl32_Teq_User_Front_Widget_SignUp} */
    const userSignUp = spec['Fl32_Teq_User_Front_Widget_SignUp$'];  // Vue component singleton
    /** @type {typeof Fl32_Teq_User_Front_Widget_SignUp_Props} */
    const SignUpProps = spec['Fl32_Teq_User_Front_Widget_SignUp#Props'];  // class constructor
    /** @type {Fl32_Teq_User_Front_Gate_Check_Existence} */
    const gateCheckExist = spec['Fl32_Teq_User_Front_Gate_Check_Existence$']; // singleton function
    /** @type {typeof Fl32_Teq_User_Shared_Service_Route_Check_Existence_Request} */
    const CheckExistReq = spec['Fl32_Teq_User_Shared_Service_Route_Check_Existence#Request']; // class constructor
    /** @type {typeof Fl32_Teq_User_Shared_Service_Route_Sign_Up_Request} */
    const Request = spec['Fl32_Teq_User_Shared_Service_Route_Sign_Up#Request'];  // class constructor

    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    /* replace 'template', 'data', 'computed', ... in used widgets */
    userSignUp.template = tmplSignUp;
    const dataOrig = userSignUp.data;
    userSignUp.data = function () {
        const result = dataOrig();
        result.isPwd = true;
        return result;
    };
    userSignUp.computed.disabledSubmit = function () {
        const warnInvalid = this.invalid.email || this.invalid.password || this.invalid.refCode;
        const warnIsEmpty = isEmpty(this.fldEmail) || isEmpty(this.fldPassword);
        return warnInvalid || warnIsEmpty;
    };
    userSignUp.watch.fldRefCode = async function (current, old) {
        // this => Fl32_Teq_User_Front_Widget_SignUp
        if (current !== old) {
            const req = new CheckExistReq();
            req.type = CheckExistReq.TYPE_REF_CODE;
            req.value = current;
            /** @type {Fl32_Teq_User_Shared_Service_Route_Check_Existence_Response} */
            const res = await gateCheckExist(req);
            if (!res.exist) {
                // referral code does not exist
                this.fldRefCode = DEF.DATA_REF_CODE_ROOT;
                this.invalid[CheckExistReq.TYPE_REF_CODE] = false;
            }
        }
    };
    userSignUp.methods.createSignUpRequest = function () {
        // this => Fl32_Teq_User_Front_Widget_SignUp
        /** @type {Fl32_Teq_User_Shared_Service_Route_Sign_Up_Request} */
        const result = new Request();
        result.email = this.fldEmail;
        result.login = this.fldEmail;
        result.name = this.fldName;
        result.password = this.fldPassword;
        result.referralCode = this.fldRefCode;
        return result;
    };

    // add I18N bundle
    i18next.addResourceBundle('dev', 'translation', I18N_BUNDLE, true);

    return {
        name: 'RouteSignIn',
        template,
        components: {userSignUp},
        data: function () {
            return {
                showInterim: false, // show interim screen after success sign up
                signUp: new SignUpProps(),
            };
        },
        props: {
            refCode: String, // "/.../:refCode" - referral code to compose users tree (see DEF.ROUTE_SIGN_UP)
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
                this.showInterim = true;
                setTimeout(() => {
                    this.showInterim = false;
                    this.$router.push(DEF.ROUTE_SIGN_UP_INIT);
                }, TIMEOUT);

            },
            ...mapMutations({
                setStateUserAuthenticated: 'user/setAuthenticated',
            }),
        },
        mounted() {
            const user = session.getUser();
            this.setStateUserAuthenticated(user);
            // transfer referral code to sign up widget
            const update = Object.assign(new SignUpProps(), this.signUp);
            if (isEmpty(this.refCode)) {
                update.refCode = DEF.DATA_REF_CODE_ROOT;
            } else {
                update.refCode = this.refCode;
            }
            this.signUp = update;
        },
    };
}
