/**
 * Widget to edit data in Groups route.
 *
 * @namespace Fl32_Bwl_Front_Widget_Edit_Group
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Edit_Group';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

const template = `
<q-dialog :model-value="display" @hide="$emit('${EVT_HIDE}');">
    <q-card style="min-width: 350px">
        <q-card-section class="t-grid gutter-xs align-items-center"
                        style="grid-template-columns: auto auto; justify-items: left;">
            <div class="text-h7 text-right">{{$t('wg:editGroup.name')}}</div>
            <q-input
                    dense
                    outlined
                    v-model="name"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg:editGroup.owner')}}</div>
            <q-input
                    dense
                    outlined
                    readonly
                    v-model="owner"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg:editGroup.dateCreated')}}</div>
            <q-input
                    dense
                    outlined
                    readonly
                    v-model="dateFormatted"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg:editGroup.mode')}}</div>
            <q-input
                    dense
                    outlined
                    readonly
                    v-model="mode"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg:editGroup.active')}}</div>
            <q-toggle
                    v-model="active"
            ></q-toggle>
            <div class="text-h7 text-right">{{$t('wg:editGroup.members')}}</div>
            <div>
                <q-chip color="blue" label="alex"></q-chip>
                <q-chip label="tanja"></q-chip>
            </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('wg:editWeight.cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('wg:editWeight.ok')" v-close-popup v-on:click="submit"></q-btn>
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
 * @memberOf Fl32_Bwl_Front_Widget_Edit_Group
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {formatDate: dateForUi} = spec['Fl32_Bwl_Shared_Util']; // ES6 module destructing

    /**
     * Template to create new instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Widget_Edit_Group
     */
    return {
        name: NS,
        template,
        components: {},
        data: function () {
            return {
                active: true,
                mode: 'Percents',
                name: 'group name',
                owner: 'John Doe',
            };
        },
        props: {
            date: Date, // date value been received from parent
            display: Boolean, // control hide/display the widget from parent
            weight: null, // weight value been received from parent
        },
        computed: {
            dateFormatted() {
                return dateForUi(i18n.language, this.selectedDate);
            },
        },
        methods: {
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
        emits: [EVT_HIDE, EVT_SUBMIT],
        mounted() {
            this.selectedDate = this.date;
            this.selectedWeight = this.weight;
        },
    };
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
