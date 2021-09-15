/**
 * Widget to edit weight in touch UI.
 * @namespace Fl32_Bwl_Front_Widget_Weight
 */

// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Weight';
const EVT_UPDATE = 'update';

const template = `
<div class="t-grid cols gutter-xl">

    <q-select
            :options="itemsInt"
            options-dense
            outlined
            v-model="selectedInt"
    ></q-select>

    <q-select
            :options="itemsDec"
            options-dense
            outlined
            v-model="selectedDec"
    ></q-select>

</div>
`;

/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Widget_Weight
 * @returns {Fl32_Bwl_Front_Widget_Weight.vueCompTmpl}
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Front_Widget_Scroller_Vertical} */
    const vScroll = spec['Fl32_Bwl_Front_Widget_Scroller_Vertical$']; // vue comp tmpl

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Widget_Weight
     */
    return {
        /* Misc: https://v3.vuejs.org/api/options-misc.html */
        name: NS,
        template,
        components: {vScroll},
        data: function () {
            return {
                selectedDec: null,
                selectedInt: null,
            };
        },
        props: {
            value: null,
        },
        computed: {
            itemsDec() {
                const result = [];
                for (let i = 0; i <= 9; i++)
                    result.push({label: String(i), value: i});
                return result;
            },
            itemsInt() {
                const result = [];
                const int = Math.trunc(this.value);
                const begin = int - 5;
                const end = int + 5;
                for (let i = begin; i <= end; i++)
                    result.push({label: String(i).padStart(2, '0'), value: i});
                return result;
            },
        },
        methods: {
            initWidgetWeight(value) {
                const norm = Number.parseFloat(value);
                const ints = Math.trunc(norm);
                this.selectedInt = {
                    label: String(ints).padStart(2, '0'),
                    value: ints
                };
                const tail = norm % 1;
                const firstDigit = Math.round(tail * 10);
                this.selectedDec = {
                    label: String(firstDigit),
                    value: firstDigit
                };
            },
            updateParent() {
                // don't update on 0 weight
                if ((this.selectedInt.value > 0) && (this.selectedDec.value >= 0)) {
                    const value = this.selectedInt.value + (this.selectedDec.value * 0.1);
                    // don't update if no changes
                    if ((value - this.value) !== 0) {
                        this.$emit(EVT_UPDATE, value);
                    }
                }
            },
        },
        watch: {
            selectedDec() {
                this.updateParent();
            },
            selectedInt() {
                this.updateParent();
            },
            value(current, old) {
                if (current !== old) this.initWidgetWeight(current);
            }
        },
        emits: [EVT_UPDATE],
        mounted() {
            this.initWidgetWeight(this.value);
        },
    };
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
