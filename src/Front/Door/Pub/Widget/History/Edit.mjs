/**
 * Widget to edit date and weight in History route.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_History_Edit
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_History_Edit';
const EVT_DELETE = 'onDelete';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

const template = `
<q-dialog :model-value="display" @hide="$emit('${EVT_HIDE}');">
    <q-card style="min-width: 350px">
        <q-card-section class="t-grid gutter-md align-items-center" style="grid-template-columns: auto auto; justify-items: center;">
            <div class="text-h7 text-right">{{$t('wg.editHistory.date')}}</div>
            <q-input
                dense
                outlined
                readonly
                v-model="dateFormatted"
                v-on:click="dialogDateDisplay=true"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg.editHistory.weight')}}</div>
            <weight
                :value="selectedWeight"
                @update="onWeightUpdate"
            ></weight>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
            <q-btn 
                :disable="disableDelete" 
                :label="$t('btn.delete')" 
                flat
                v-close-popup 
                v-on:click="deleteItem"
            ></q-btn>
            <q-btn flat :label="$t('btn.cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('btn.ok')" v-close-popup v-on:click="submit"></q-btn>
        </q-card-actions>
    </q-card>
    <dialog-date
        :display="dialogDateDisplay"
        :value="selectedDate"
        @onHide="dialogDateDisplay=false"
        @onSubmit="onDateIsSelected"
    ></dialog-date>
</q-dialog>    
`;

// DEFINE MODULE'S FUNCTIONS
/**
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_History_Edit
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {TeqFw_I18n_Front_Lib} */
    const i18n = spec['TeqFw_I18n_Front_Lib$'];
    /** @type {Fl32_Bwl_Front_Widget_Dialog_Date} */
    const dialogDate = spec['Fl32_Bwl_Front_Widget_Dialog_Date$'];
    /** @type {Fl32_Bwl_Front_Widget_Weight.vueCompTmpl} */
    const weight = spec['Fl32_Bwl_Front_Widget_Weight$'];
    const {formatDate: dateForUi} = spec['Fl32_Bwl_Shared_Util'];
    const {formatDate: dateAsStr} = spec['TeqFw_Core_Shared_Util'];
    /**
     * Template to create new instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_History_Edit
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {dialogDate, weight},
        data: function () {
            return {
                dialogDateDisplay: false,
                selectedDate: null,
                selectedWeight: null,
            };
        },
        props: {
            date: Date, // date value been received from parent
            display: Boolean, // control hide/display the widget from parent
            weight: null, // weight value been received from parent
        },
        computed: {
            dateFormatted() {
                return dateForUi(i18n.getLang(), this.selectedDate);
            },
            disableDelete() {
                const selected = dateAsStr(this.selectedDate);
                const now = dateAsStr(new Date());
                return selected === now;
            },
        },
        methods: {
            /**
             * Pass date to delete the item to the parent.
             */
            deleteItem() {
                this.$emit(EVT_DELETE, this.selectedDate);
            },
            /**
             * Receive date value from auxiliary dialog.
             * @param {Date} date
             */
            onDateIsSelected(date) {
                this.dialogDateDisplay = false;
                this.selectedDate = date;
            },
            onWeightUpdate(value) {
                this.selectedWeight = value;
            },
            /**
             * Pass selected values to the parent.
             */
            submit() {
                this.$emit(EVT_SUBMIT, this.selectedDate, this.selectedWeight);
            }
        },
        watch: {
            date(current) {
                this.selectedDate = current;
            },
            display(current) {
                // reset internal vars to parent values
                if (current) {
                    this.selectedDate = this.date;
                    this.selectedWeight = this.weight;
                }
            },
            weight(current) {
                this.selectedWeight = current;
            }
        },
        emits: [EVT_DELETE, EVT_HIDE, EVT_SUBMIT],
        mounted() {
            this.selectedDate = this.date;
            this.selectedWeight = this.weight;
        },
    };
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

// MODULE'S EXPORT
export default Factory;
