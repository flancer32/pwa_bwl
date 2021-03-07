/**
 * @namespace Fl32_Bwl_Front_Widget_EditWeight
 */

const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

const I18N_BUNDLE = {
    cancel: 'Cancel',
    ok: 'OK',
    titleCurrent: 'Set current weight (kg)',
    titleStart: 'Set start weight (kg)',
    titleTarget: 'Set target weight (kg)',
};

const template = `
<q-dialog v-model="display" @hide="onHide">
    <q-card style="min-width: 350px">
        <div class="t-grid cols align-items-center">
            <div class="text-h7">{{title}}</div>
            <div class="text-h7" style="text-align: end">{{dateFormatted}}</div>
        </div>

        <q-card-section class="q-pt-none t-grid" style="justify-content: center;">
            <div class="t-grid cols gutter-xl" style="justify-content: stretch; height:200px; min-width: 100px">
                <v-scroll
                        :initValue="selectedInts"
                        :items="weightInts"
                        @selected="intIsSelected"
                        style="max-width: 50px;"
                ></v-scroll>
                <v-scroll
                        :initValue="selectedDecimals"
                        :items="weightDecimals"
                        @selected="decimalIsSelected"
                        style="max-width: 50px;"
                ></v-scroll>
            </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('addWeight:cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('addWeight:ok')" v-close-popup v-on:click="submit"></q-btn>
        </q-card-actions>
    </q-card>
</q-dialog>    
`;

/**
 * @memberOf Fl32_Bwl_Front_Widget_EditWeight
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const i18next = spec[DEF.MOD_CORE.DI_I18N];   // named singleton
    /** @type {TeqFw_Vue_Front_Widget_Scroller_Vertical} */
    const vScroll = spec['TeqFw_Vue_Front_Widget_Scroller_Vertical$']; // instance singleton
    /** @type {Fl32_Bwl_Front_Gate_Weight_Stat_Save.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Weight_Stat_Save$']; // function instance
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Request']; // class constructor
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types} */
    const Types = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Types']; // class constructor

    i18next.addResourceBundle('dev', 'addWeight', I18N_BUNDLE, true);

    /**
     * Codifier for weight types.
     *
     * @type {{TARGET: string, START: string, CURRENT: string}}
     * @memberOf Fl32_Bwl_Front_Widget_EditWeight.widget
     */
    const TYPES = {
        CURRENT: Types.CURRENT,
        START: Types.START,
        TARGET: Types.TARGET,
    };
    Object.freeze(TYPES);

    /**
     * @instance
     * @memberOf Fl32_Bwl_Front_Widget_EditWeight
     * @name widget
     */
    const widget = {
        name: 'EditWeight',
        template,
        components: {vScroll},
        data: function () {
            return {
                display: false, // internal attribute for the dialog
                selectedDecimals: null,
                selectedInts: null,
            };
        },
        props: { // API to get values from parent widget
            init: false, // hide/display dialog initially
            type: String, // start, current, target weight (see Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types)
            weight: null, // initial weight
        },
        computed: {
            /** @returns {Date} */
            date() {
                return new Date();
            },
            dateFormatted() {
                return this.date.toLocaleDateString(i18next.language, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            },
            title() {
                const key = (this.type === TYPES.CURRENT) ? 'titleCurrent'
                    : (this.type === TYPES.TARGET) ? 'titleTarget'
                        : (this.type === TYPES.START) ? 'titleStart' : 'unknown';
                return this.$t(`addWeight:${key}`);
            },
            weightDecimals() {
                const result = [];
                for (let i = 0; i <= 9; i++)
                    result.push({key: i, value: String(i)});
                return result;
            },
            weightInts() {
                const result = [];
                for (let i = 0; i <= 200; i++)
                    result.push({key: i, value: String(i).padStart(2, '0')});
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
                const value = this.selectedInts + (this.selectedDecimals * 0.1);
                const req = new Request();
                req.date = this.date;
                req.weight = value;
                req.type = this.type;
                await gate(req);
                this.display = false;
                this.$emit(EVT_SUBMIT, value, this.type);
            },
        },
        watch: {
            init(current) {
                this.display = current;
                if (current && this.weight) {
                    const norm = Number.parseFloat(this.weight);
                    this.selectedInts = String(Math.trunc(norm)).padStart(2, '0');
                    const tail = norm % 1;
                    const firstDigit = Math.round(tail * 10);
                    this.selectedDecimals = String(firstDigit);
                }
            }
        },
        emits: [EVT_HIDE, EVT_SUBMIT],
        TYPES,
    };
    return widget;
}

export default Factory;
