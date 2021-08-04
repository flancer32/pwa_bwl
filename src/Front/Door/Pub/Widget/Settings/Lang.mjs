/**
 * Language configuration widget.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang';
const LANG_EN = 'en';
const LANG_RU = 'ru';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {TeqFw_I18n_Front_Lib} */
    const i18n = spec['TeqFw_I18n_Front_Lib$'];
    /** @type {Fl32_Bwl_Front_Model_Lang} */
    const modLang = spec['Fl32_Bwl_Front_Model_Lang$'];

    // DEFINE WORKING VARS
    const template = `
<q-card class="bg-white">
    <q-card-section>
        <div class="text-subtitle2">{{$t('wg.settings.lang.title')}}:</div>
        <q-option-group
                :options="optsLang"
                inline
                v-model="fldLang"
        ></q-option-group>
    </q-card-section>
</q-card>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Settings_Lang
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                fldLang: null,
            };
        },
        computed: {
            optsLang() {
                return [
                    {label: this.$t('wg.settings.lang.en'), value: LANG_EN},
                    {label: this.$t('wg.settings.lang.ru'), value: LANG_RU},
                ];
            },
        },
        watch: {
            async fldLang(current, old) {
                if (old !== null && current !== old && (current === LANG_RU || current === LANG_EN)) {
                    await i18n.setLang(current);
                    // increment lang counter to refresh all components starting from base layout
                    const lang = modLang.getData();
                    lang.value++;
                }
            }
        },
        mounted() {
            this.fldLang = i18n.getLang();
        },
    };
}
// to get namespace on debug
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

