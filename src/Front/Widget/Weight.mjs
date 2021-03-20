/**
 * Widget to edit weight in touch UI (2 vertical scrolls).
 * @namespace Fl32_Bwl_Front_Widget_Weight
 */

// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Weight';
const EVT_UPDATE = 'update';

const template = `
<div class="t-grid cols gutter-xl" style="height:200px; width: 100px">
    <v-scroll
            :initValue="selectedInt"
            :items="itemsInt"
            @selected="intIsSelected"
    ></v-scroll>
    <v-scroll
            :initValue="selectedDec"
            :items="itemsDec"
            @selected="decimalIsSelected"
    ></v-scroll>
</div>
`;

/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Widget_Weight
 * @returns {Fl32_Bwl_Front_Widget_Weight.vueCompTmpl}
 */
function Factory(spec) {
    /** @type {TeqFw_Vue_Front_Widget_Scroller_Vertical} */
    const vScroll = spec['TeqFw_Vue_Front_Widget_Scroller_Vertical$']; // vue comp tmpl

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
                    result.push({key: i, value: String(i)});
                return result;
            },
            itemsInt() {
                const result = [];
                for (let i = 0; i <= 200; i++)
                    result.push({key: i, value: String(i).padStart(2, '0')});
                return result;
            },
        },
        methods: {
            decimalIsSelected(key) {
                this.selectedDec = key;
                this.updateParent();
            },
            intIsSelected(key) {
                this.selectedInt = key;
                this.updateParent();
            },
            initWidgetWeight(value) {
                const norm = Number.parseFloat(value);
                this.selectedInt = String(Math.trunc(norm)).padStart(2, '0');
                const tail = norm % 1;
                const firstDigit = Math.round(tail * 10);
                this.selectedDec = String(firstDigit);
            },
            updateParent() {
                // don't update on 0 weight
                if (this.selectedInt && this.selectedDec) {
                    const value = this.selectedInt + (this.selectedDec * 0.1);
                    // don't update if no changes
                    if ((value - this.value) !== 0) {
                        this.$emit(EVT_UPDATE, value);
                    }
                }
            },
        },
        watch: {
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
