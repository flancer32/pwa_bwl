const I18N_BUNDLE = {
    ageHint: 'From 1 to 127 years: 32',
    ageLabel: 'Your age',
    error: 'Error',
    errRequired: 'Please type something',
    heightHint: 'From 32 cm to 256 cm: 168',
    heightLabel: 'Your height',
    sexHint: 'XX - natural female, XY - natural male',
    sexLabel: 'Your gender',
    weightCurrentHint: 'From 32 kg to 256 kg: 95.5',
    weightCurrentLabel: 'Your current weight',
    weightTargetHint: 'From 32 kg to 256 kg: 75.0',
    weightTargetLabel: 'Your desired weight',
};

const template = `
<layout-centered>
    <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="t-grid rows gutter-md"
    >
        <div class="t-grid rows gutter-none">
            <div class="t-grid cols align-items-center" style="">
                <div class="">{{$t('sexLabel')}}:</div>
                <q-radio v-model="sex" val="women" color="pink" label="XX"></q-radio>
                <q-radio v-model="sex" val="notWomen" color="light-blue" label="XY"></q-radio>
            </div>
            <div class="hint">{{$t('sexHint')}}</div>
        </div>
        
        <q-input class="id-age"
                 :hint="$t('ageHint')"
                 :label="$t('ageLabel') + ' *'"
                 :rules="rulesNum"
                 lazy-rules
                 outlined
                 type="number"
                 v-model="age"
        ></q-input>

        <q-input class="id-height"
                 :hint="$t('heightHint')"
                 :label="$t('heightLabel') + ' *'"
                 :rules="rulesNum"
                 lazy-rules
                 outlined
                 type="number"
                 v-model="height"
        ></q-input>
        
        <q-input class="id-weight-current"
                 :hint="$t('weightCurrentHint')"
                 :label="$t('weightCurrentLabel') + ' *'"
                 :rules="rulesNum"
                 lazy-rules
                 outlined
                 step="0.1"
                 type="number"
                 v-model="weightCurrent"
        ></q-input>
        
        <q-input class="id-weighttTarget"
                 :hint="$t('weightTargetHint')"
                 :label="$t('weightTargetLabel') + ' *'"
                 :rules="rulesNum"
                 lazy-rules
                 outlined
                 step="0.1"
                 type="number"
                 v-model="weightTarget"
        ></q-input>

        <div>
            <q-btn label="Submit" type="submit" color="primary"></q-btn>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
        </div>
    </q-form>
    
</layout-centered>
`;

/**
 * Second step of sign up process. Form to get initial body parameters to save in profile.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @returns {Object}
 * @namespace
 */
export default function Fl32_Bwl_Front_Realm_Pub_Route_Sign_Up_Init(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    const i18next = spec[DEF.MOD_CORE.DI_I18N];   // named singleton
    /** @type {Fl32_Bwl_Front_Gate_SignUp_Init.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_SignUp_Init$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_SignUp_Init_Request} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_SignUp_Init#Request']; // class constructor
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_SignUp_Init_Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_SignUp_Init#Response']; // class constructor

    // add I18N bundle
    i18next.addResourceBundle('dev', 'translation', I18N_BUNDLE, true);

    return {
        name: 'RouteSignInInit',
        template,
        components: {},
        data: function () {
            return {
                age: null,
                height: null,
                sex: null,
                weightCurrent: null,
                weightTarget: null,
            };
        },
        computed: {
            rulesNum() {
                return [
                    val => val !== null && val !== '' || this.$t('errRequired'),
                    val => val > 0 && val < 300 || this.$t('errRequired')
                ];
            }
        },
        methods: {
            onReset() {
                console.log('Reset');
            },
            async onSubmit() {
                const req = new Request();
                req.age = this.age;
                req.height = this.height;
                req.isFemale = (this.sex === 'women');
                req.weightInit = this.weightCurrent;
                req.weightTarget = this.weightTarget;
                const res = await gate(req);
                if (res instanceof Response) {
                    this.$router.push(DEF.REALM_PUB_ROUTE_HOME);
                }
            },
        },
        async mounted() {
            // redirect to authentication if not authenticated
            await session.checkUserAuthenticated(this.$router);
        },
    };
}
