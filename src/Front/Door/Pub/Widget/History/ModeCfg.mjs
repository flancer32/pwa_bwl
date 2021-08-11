/**
 * Top widget to set running mode for the route.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_History_ModeCfg
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_History_ModeCfg';
const EVT_ADD = 'onAdd';
const I18N_OPTS_TYPE = 'opts.weight.type';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_History_ModeCfg
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_History_ModeCfg.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Bwl_Front_Model_Profile_History} */
    const modProfile = spec['Fl32_Bwl_Front_Model_Profile_History$'];
    /** @type {Fl32_Bwl_Front_Struct_Options_WeightType} */
    const optionsType = spec['Fl32_Bwl_Front_Struct_Options_WeightType$'];

    // DEFINE WORKING VARS
    const template = `
<q-card class="q-pa-xs row text-center">
    <div class="col">
        <q-btn-toggle class=""
            v-model="dataType"
            :options="optsType"
        ></q-btn-toggle>
    </div>
    <div class="col">
        <q-btn v-on:click="$emit('${EVT_ADD}', dataType);">Add</q-btn>
    </div>
</q-card>
`;
    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_History_ModeCfg
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                dataType: modProfile.weightType
            }
        },
        computed: {
            optsType() {
                return optionsType.getItems(this, I18N_OPTS_TYPE);
            },
        },
        watch: {
            dataType(current) {
                modProfile.weightType = current;
            }
        },
        emits: [EVT_ADD],
    };
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

