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

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Widget_Edit_Weight
 * @returns {Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {TeqFw_I18n_Front_Lib} */
    const i18n = spec['TeqFw_I18n_Front_Lib$'];
    /** @type {Fl32_Bwl_Front_Widget_Weight.vueCompTmpl} */
    const weight = spec['Fl32_Bwl_Front_Widget_Weight$'];
    /** @type {TeqFw_Web_Front_WAPI_Gate} */
    const gate = spec['TeqFw_Web_Front_WAPI_Gate$'];
    /** @type {Fl32_Bwl_Shared_WAPI_Weight_Stat_Save.Factory} */
    const route = spec['Fl32_Bwl_Shared_WAPI_Weight_Stat_Save#Factory$'];
    /** @type {typeof Fl32_Bwl_Shared_WAPI_Weight_Stat_Save.Types} */
    const Types = spec['Fl32_Bwl_Shared_WAPI_Weight_Stat_Save#Types'];
    /** @type {Function|Fl32_Bwl_Shared_Util.formatDate} */
    const formatDate = spec['Fl32_Bwl_Shared_Util#formatDate'];

    // DEFINE WORKING VARS
    /**
     * Codifier for weight types.
     *
     * @type {{TARGET: string, START: string, CURRENT: string}}
     * @memberOf Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl
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
            <q-btn flat :label="$t('btn.cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('btn.ok')" v-close-popup v-on:click="submit"></q-btn>
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
        teq: {package: DEF.SHARED.NAME},
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
            type: String, // start, current, target weight (see Fl32_Bwl_Shared_WAPI_Weight_Stat_Save.Types)
            weight: null, // initial weight
        },
        computed: {
            /** @returns {Date} */
            date() {
                return new Date();
            },
            dateFormatted() {
                return formatDate(i18n.getLang(), this.date);
            },
            title() {
                return this.$t(`wg.editWeight.title.${this.type}`);
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
                const req = route.createReq();
                req.date = this.date;
                req.weight = value;
                req.type = this.type;
                const res = await gate.send(req, route);
                if (res) {
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
export {
    Factory as default
};
