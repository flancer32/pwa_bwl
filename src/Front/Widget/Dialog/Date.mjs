/**
 * Dialog to select a date.
 *
 * @namespace Fl32_Bwl_Front_Widget_Dialog_Date
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Dialog_Date';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

const template = `
<q-dialog :model-value="display" @hide="onHide">
    <q-date
            v-model="date"
            minimal
    ></q-date>
</q-dialog>
`;

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Widget_Dialog_Date
 * @returns {Fl32_Bwl_Front_Widget_Dialog_Date.vueCompTmpl}
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
    const i18next = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // named singleton destructuring

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Widget_Dialog_Date
     */
    return {
        name: 'DialogDate',
        template,
        data() {
            return {};
        },
        props: {
            display: Boolean, // hide/display dialog from parent
        },
        computed: {
            date() {
                return new Date();
            },
            title() {
                return this.$t('wg:editHistory.title');
            },
        },
        methods: {
            /**
             * Emit event to notify parent to change dialog display state.
             */
            onHide() {
                this.$emit(EVT_HIDE);
            },
        },
    };
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
