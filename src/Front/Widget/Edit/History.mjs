/**
 * @namespace Fl32_Bwl_Front_Widget_Edit_History
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Edit_History';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

const template = `
<q-dialog :model-value="display" @hide="onHide">
    <q-card style="min-width: 350px">
        <q-card-section class="t-grid gutter-md align-items-center" style="grid-template-columns: auto auto; justify-items: center;">
            <div class="text-h7 text-right">{{$t('fld:date')}}</div>
            <q-input
                dense
                outlined
                readonly
                v-model="dateFormatted"
                v-on:click="dialogDateDisplay=true"
            ></q-input>
            <div class="text-h7 text-right">{{$t('fld:weight')}}</div>
            <weight></weight>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('wg:editWeight.cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('wg:editWeight.ok')" v-close-popup v-on:click="submit"></q-btn>
        </q-card-actions>
    </q-card>
    <dialog-date
        :display="dialogDateDisplay"
        @onHide="dialogDateDisplay=false"
    ></dialog-date>
</q-dialog>    
`;

// MODULE'S CLASSES

// DEFINE MODULE'S FUNCTIONS
/**
 * @memberOf Fl32_Bwl_Front_Widget_Edit_History
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    /** @type {Fl32_Bwl_Front_Widget_Dialog_Date} */
    const dialogDate = spec['Fl32_Bwl_Front_Widget_Dialog_Date$']; // vue comp tmpl
    /** @type {Fl32_Bwl_Front_Widget_Weight.vueCompTmpl} */
    const weight = spec['Fl32_Bwl_Front_Widget_Weight$']; // vue comp tmpl
    /** @type {Fl32_Bwl_Front_Gate_Weight_Stat_Save.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Weight_Stat_Save$']; // function instance
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Request']; // class constructor
    const {formatDate} = spec['Fl32_Bwl_Shared_Util']; // ES6 module destructing
    /**
     * Template to create new instances using Vue.
     *
     * @instance
     * @memberOf Fl32_Bwl_Front_Widget_Edit_History
     * @name vueCompTmpl
     */
    const vueCompTmpl = {
        name: 'EditHistory',
        template,
        components: {dialogDate, weight},
        data: function () {
            return {
                dialogDateDisplay: false,
                selectedDecimals: null,
                selectedInts: null,
            };
        },
        props: { // API to get values from parent widget
            display: Boolean, // hide/display dialog from parent
        },
        computed: {
            /** @returns {Date} */
            date() {
                return new Date();
            },
            dateFormatted() {
                return formatDate(i18n.language, this.date);
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
                // this.dialogDateDisplay = true;
                // const value = this.selectedInts + (this.selectedDecimals * 0.1);
                // const req = new Request();
                // req.date = this.date;
                // req.weight = value;
                // req.type = this.type;
                // await gate(req);
                // this.$emit(EVT_SUBMIT, value, this.type);
            },
        },
        watch: {},
        emits: [EVT_HIDE, EVT_SUBMIT],
    };

    return vueCompTmpl;
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
