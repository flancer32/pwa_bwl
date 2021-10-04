/**
 * Web Push setup widget.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_Settings_Push
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_Settings_Push';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Settings_Push
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_Settings_Push.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {TeqFw_Web_Push_Shared_Service_Route_Load_ServerKey.Factory} */
    const routeKey = spec['TeqFw_Web_Push_Shared_Service_Route_Load_ServerKey#Factory$'];
    /** @type {TeqFw_Web_Push_Shared_Service_Route_Subscript_Save.Factory} */
    const routeSave = spec['TeqFw_Web_Push_Shared_Service_Route_Subscript_Save#Factory$'];

    // DEFINE WORKING VARS
    const template = `
<q-card class="bg-white">
    <q-card-section>
        <div class="text-subtitle2">{{$t('wg.settings.push.title')}}:</div>
        <q-btn :label="$t('btn.enable')" v-on:click="subscribe"></q-btn>
    </q-card-section>
</q-card>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Settings_Push
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {};
        },
        computed: {},
        methods: {
            async subscribe() {
                try {
                    // get server key from backend
                    const reqKey = routeKey.createReq();
                    // noinspection JSValidateTypes
                    /** @type {TeqFw_Web_Push_Shared_Service_Route_Load_ServerKey.Response} */
                    const resKey = await gate.send(reqKey, routeKey);
                    if (resKey) {
                        // subscribe to push events
                        const opts = {
                            userVisibleOnly: true,
                            applicationServerKey: resKey.key
                        };
                        const sw = await navigator.serviceWorker.ready;
                        const subscription = await sw.pushManager.subscribe(opts);
                        // save subscription data to backend
                        const json = subscription.toJSON();
                        const reqSave = routeSave.createReq();
                        reqSave.endpoint = json.endpoint;
                        reqSave.auth = json.keys.auth;
                        reqSave.p256dh = json.keys.p256dh;
                        /** @type {TeqFw_Web_Push_Shared_Service_Route_Subscript_Save.Response} */
                        const resSave = await gate.send(reqSave, routeSave);
                        console.log(`Push subscription is saved: ${resSave.subscriptId}`);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        },
        watch: {},

        mounted() { },
    };
}
// to get namespace on debug
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

