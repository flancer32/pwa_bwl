const I18N_BUNDLE = {
    ageHint: 'From 1 to 127 years: 32',
    ageLabel: 'Your age',
    errRequired: 'Please type something',
    heightHint: 'From 32 cm to 256 cm: 168',
    heightLabel: 'Your height',
    sexHint: 'XX - natural female, XY - natural male',
    sexLabel: 'Your gender',
    weightHint: 'From 32 kg to 256 kg: 64.8',
    weightLabel: 'Your weight',
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
                <q-radio v-model="sex" val="men" color="light-blue" label="XY"></q-radio>
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

        <q-input class="id-weight"
                 :hint="$t('weightHint')"
                 :label="$t('weightLabel') + ' *'"
                 :rules="rulesNum"
                 lazy-rules
                 outlined
                 step="0.1"
                 type="number"
                 v-model="weight"
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
export default function Fl32_Bwl_Front_Route_Sign_Up_Init(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    const i18next = spec[DEF.MOD_CORE.DI_I18N];   // named singleton
    const {isEmpty} = spec['TeqFw_Core_App_Shared_Util'];

    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

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
                weight: null,
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
            rulesNumber() {
                return;
            },
            onReset() {
                console.log('Reset');
            },
            onSubmit() {
                console.log('Submit');
            },
        },
        async mounted() {
            if (await session.checkUserAuthenticated(this.$router)) {
                console.log('authenticated.');
            }
        },
    };
}
