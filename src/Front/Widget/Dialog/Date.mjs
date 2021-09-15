/**
 * Dialog widget to select a date.
 *
 * @namespace Fl32_Bwl_Front_Widget_Dialog_Date
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Dialog_Date';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

const template = `
<q-dialog :model-value="display" @hide="$emit('${EVT_HIDE}')">
    <q-date
            v-model="date"
            minimal
            @update:modelValue="dateSelected"
    ></q-date>
</q-dialog>
`;

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Widget_Dialog_Date
 * @returns {Fl32_Bwl_Front_Widget_Dialog_Date.vueCompTmpl}
 */
function Factory(spec) {
    const {formatDate} = spec['TeqFw_Core_Shared_Util'];


    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Widget_Dialog_Date
     */
    return {
        name: NS,
        template,
        data() {
            return {
                date: null, // model field for q-date widget (internal usage)
            };
        },
        props: {
            display: Boolean, // hide/display dialog from parent
            value: Date,    // date value been received from parent
        },
        methods: {
            /**
             * Get selected value from "q-date" widget.
             * (see https://next.quasar.dev/vue-components/date)
             *
             * @param {String} value New model value
             */
            dateSelected(value) {
                if (value === null) {
                    // the same date is selected again (remove event), just return the same date
                    this.$emit(EVT_SUBMIT, this.date);
                } else {
                    // new date is selected
                    const date = new Date(`${value}Z`); // add 'Z' to parse as UTC
                    this.$emit(EVT_SUBMIT, date);
                }
            },
        },
        watch: {
            value(current) {
                this.date = formatDate(current);
            }
        },
        mounted() {
            this.date = formatDate(this.value);
        }
    };
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
