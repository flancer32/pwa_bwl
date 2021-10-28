/**
 * Service Worker confniguration widget.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_Settings_SwConfig
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_Settings_SwConfig';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Settings_SwConfig
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_Settings_SwConfig.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {TeqFw_Web_Front_Model_Sw_Control} */
    const swControl = spec['TeqFw_Web_Front_Model_Sw_Control$'];

    // DEFINE WORKING VARS
    const template = `
<q-card class="bg-white">
    <q-card-section>
        <div class="text-subtitle2">{{$t('wg.settings.swConfig.title')}}:</div> 
        <div class="text-subtitle3">{{$t('wg.settings.swConfig.cache.title')}}:</div>
        <div class="q-gutter-xs">
            <q-btn :label="$t('btn.clean')"  v-on:click="cacheClean"></q-btn>
            <q-btn :label="$t('btn.disable')" v-if="cacheEnabled" v-on:click="cacheDisable"></q-btn>
            <q-btn :label="$t('btn.enable')" v-if="!cacheEnabled" v-on:click="cacheEnable"></q-btn>
            <q-btn dense flat round icon="lens" size="8.5px" :color="color" />
        </div>
    </q-card-section>
</q-card>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Settings_SwConfig
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                cacheEnabled: null
            };
        },
        computed: {
            color() {
                return (this.cacheEnabled) ? 'green' : 'grey';
            }
        },
        methods: {
            async cacheDisable() {
                await swControl.setCacheStatus(false);
                this.cacheEnabled = await swControl.getCacheStatus();
            },
            async cacheEnable() {
                await swControl.setCacheStatus(true);
                this.cacheEnabled = await swControl.getCacheStatus();
            },
            async cacheClean() {
                await swControl.cacheClean();
            }
        },
        watch: {},

        async mounted() {
            this.cacheEnabled = await swControl.getCacheStatus();
        },
    };
}
// to get namespace on debug
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

