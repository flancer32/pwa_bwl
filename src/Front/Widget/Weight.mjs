/**
 * @namespace Fl32_Bwl_Front_Widget_Weight
 */

// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Weight';

const template = `
<div class="t-grid cols gutter-xl" style="height:200px; width: 100px">
    <v-scroll
            :initValue="selectedInts"
            :items="weightInts"
            @selected="intIsSelected"
    ></v-scroll>
    <v-scroll
            :initValue="selectedDecimals"
            :items="weightDecimals"
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
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
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
                selectedDecimals: null,
                selectedInts: null,
            };
        },
        props: {
            value: null, // decimal number
        },
        computed: {
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
        },
    };
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
