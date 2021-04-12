/**
 * Widget to edit weight as (999.9) numbers using mobile UI (touch).
 * There are 3 types of the weights to save on server:
 *  - current
 *  - start
 *  - target
 *
 * @namespace Fl32_Bwl_Front_Widget_Edit_Weight
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Edit_Weight';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Widget_Edit_Weight
 * @returns {Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N];   // named singleton
    /** @type {Fl32_Bwl_Front_Widget_Weight.vueCompTmpl} */
    const weight = spec['Fl32_Bwl_Front_Widget_Weight$']; // vue comp tmpl
    /** @type {Fl32_Bwl_Front_Gate_Weight_Stat_Save.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Weight_Stat_Save$']; // function instance
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Request']; // class
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Response} */
    const Response = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Response']; // class
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types} */
    const Types = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Types']; // class
    const {formatDate} = spec['Fl32_Bwl_Shared_Util']; // ES6 module destructing

    // DEFINE WORKING VARS
    /**
     * Codifier for weight types.
     *
     * @type {{TARGET: string, START: string, CURRENT: string}}
     * @memberOf Fl32_Bwl_Front_Widget_Edit_Weight.widget
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

        <q-card-section class="t-grid rows gutter-md" style="justify-items: center">
            <div class="t-grid cols gutter-xl" style="width: 100%">
                <div class="text-h7">{{title}}</div>
                <div class="text-h7" style="text-align: end">{{dateFormatted}}</div>
            </div>
            <div style="width: 200px">
                <weight
                        :value="selectedWeight"
                        @update="onWeightUpdate"
                ></weight>
            </div>
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
     * @memberOf Fl32_Bwl_Front_Widget_Edit_Weight
     */
    return {
        name: NS,
        template,
        components: {weight},
        data: function () {
            return {
                selectedWeight: null,
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
        },
        methods: {
            onHide() {
                this.$emit(EVT_HIDE);
            },
            onWeightUpdate(value) {
                this.selectedWeight = value;
            },
            async submit() {
                const value = this.selectedWeight;
                const req = new Request();
                req.date = this.date;
                req.weight = value;
                req.type = this.type;
                const res = await gate(req);
                if (res instanceof Response) {
                    this.$emit(EVT_SUBMIT, value, this.type);
                } else {
                    console.log('Error: cannot update weight on server. See dev. tools logs.');
                }
            },
        },
        watch: {
            // TODO: should we watch display or weight?
            display(current) {
                if (current && this.weight) {
                    this.selectedWeight = this.weight;
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
