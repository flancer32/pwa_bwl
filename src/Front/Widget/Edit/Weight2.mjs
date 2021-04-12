/**
 * Widget to edit weight as (999.9) numbers using mobile UI (touch).
 * There are 3 types of the weights to save on server:
 *  - current
 *  - start
 *  - target
 *
 * @namespace Fl32_Bwl_Front_Widget_Edit_Weight2
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Edit_Weight2';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Widget_Edit_Weight2
 * @returns {Fl32_Bwl_Front_Widget_Edit_Weight2.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N];   // named singleton
    /** @type {TeqFw_Vue_Front_Widget_Scroller_Vertical} */
    const vScroll = spec['TeqFw_Vue_Front_Widget_Scroller_Vertical$']; // instance singleton
    /** @type {Fl32_Bwl_Front_Gate_Weight_Stat_Save.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Weight_Stat_Save$']; // function instance
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Request']; // class
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types} */
    const Types = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Types']; // class
    const {formatDate} = spec['Fl32_Bwl_Shared_Util']; // ES6 module destructing

    // DEFINE WORKING VARS
    /**
     * Codifier for weight types.
     *
     * @type {{TARGET: string, START: string, CURRENT: string}}
     * @memberOf Fl32_Bwl_Front_Widget_Edit_Weight2.widget
     */
    const TYPES = {
        CURRENT: Types.CURRENT,
        START: Types.START,
        TARGET: Types.TARGET,
    };
    Object.freeze(TYPES);

    const template = `
<q-dialog :model-value="display" @hide="onHide">
    <q-card style="min-width: 350px">
        <div class="t-grid cols align-items-center">
            <div class="text-h7">{{title}}</div>
            <div class="text-h7" style="text-align: end">{{dateFormatted}}</div>
        </div>

        <q-card-section class="t-grid cols gutter-xl" style="justify-content: center;">

            <q-select
                    :options="weightInts"
                    options-dense
                    outlined
                    v-model="selectedInts"
            ></q-select>

            <q-select
                    :options="weightDecimals"
                    options-dense
                    outlined
                    v-model="selectedDecimals"
            ></q-select>
            
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('wg:editWeight.cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('wg:editWeight.ok')" v-close-popup v-on:click="submit"></q-btn>
        </q-card-actions>
    </q-card>
</q-dialog>    
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Widget_Edit_Weight2
     */
    return {
        name: NS,
        template,
        components: {vScroll},
        data: function () {
            return {
                selectedDecimals: null,
                selectedInts: null,
            };
        },
        props: { // API to get values from parent widget
            display: Boolean, // hide/display dialog from parent
            type: String, // start, current, target weight (see Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types)
            weight: null, // initial weight
        },
        computed: {
            /** @returns {Date} */
            date() {
                return new Date();
            },
            dateFormatted() {
                return formatDate(i18n.language, this.date);
            },
            title() {
                return this.$t(`wg:editWeight.title.${this.type}`);
            },
            weightDecimals() {
                const result = [];
                for (let i = 0; i <= 9; i++)
                    result.push({label: String(i), value: i});
                return result;
            },
            weightInts() {
                const result = [];
                const int = Math.trunc(this.weight);
                const begin = int - 5;
                const end = int + 5;
                for (let i = begin; i <= end; i++)
                    result.push({label: String(i).padStart(2, '0'), value: i});
                return result;
            },
        },
        methods: {
            decimalIsSelected(key) {
                this.selectedDecimals = key;
            },
            intIsSelected(key) {
                this.selectedInts = key;
            },
            onHide() {
                this.$emit(EVT_HIDE);
            },
            async submit() {
                const value = this.selectedInts.value + (this.selectedDecimals.value * 0.1);
                const req = new Request();
                req.date = this.date;
                req.weight = value;
                req.type = this.type;
                await gate(req);
                this.$emit(EVT_SUBMIT, value, this.type);
            },
        },
        watch: {
            // TODO: should we watch display or weight?
            display(current) {
                if (current && this.weight) {
                    const norm = Number.parseFloat(this.weight);
                    const ints = Math.trunc(norm);
                    this.selectedInts = {
                        label: String(ints).padStart(2, '0'),
                        value: ints
                    };
                    const tail = norm % 1;
                    const firstDigit = Math.round(tail * 10);
                    this.selectedDecimals = {
                        label: String(firstDigit),
                        value: firstDigit
                    };
                }
            }
        },
        emits: [EVT_HIDE, EVT_SUBMIT],
        TYPES,
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
