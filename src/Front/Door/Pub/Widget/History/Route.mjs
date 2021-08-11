/**
 * 'History' route.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_History_Route
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_History_Route';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_History_Route
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_History_Route.vueCompTmpl}
 */
export default function Factory(spec) {
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec['Fl32_Bwl_Front_Layout_TopActions$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_History_Edit} */
    const editHistory = spec['Fl32_Bwl_Front_Door_Pub_Widget_History_Edit$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item'];
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Types} */
    const TYPES = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Types'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Factory} */
    const routeRemove = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_Remove#Factory$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Factory} */
    const routeSave = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Factory$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_History_Grid.vueCompTmpl} */
    const grid = spec['Fl32_Bwl_Front_Door_Pub_Widget_History_Grid$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_History_ModeCfg.vueCompTmpl} */
    const modeCfg = spec['Fl32_Bwl_Front_Door_Pub_Widget_History_ModeCfg$'];

    // DEFINE WORKING VARS
    const template = `
<q-page class="q-pa-xs q-gutter-xs">
    <mode-cfg @onAdd="onAdd"/>
    <grid/>
    <edit-history
        :date="dateCurrent"
        :display="dialogDisplay"
        :weight="weightCurrent"
        @onDelete="onEditHistoryRemove"
        @onHide="dialogDisplay=false"
        @onSubmit="onEditHistorySubmit"
    ></edit-history>
</q-page>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_History_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {editHistory, modeCfg, grid},
        data() {
            return {
                dateCurrent: new Date(),
                dialogDisplay: false,
                weightCurrent: 0,
            };
        },
        methods: {
            async onEditHistoryRemove(date) {
                const req = routeRemove.createReq();
                req.date = date;
                const res = await gate.send(req, routeRemove);
                if (res) await this.loadHistory();
            },
            async onEditHistorySubmit(date, weight) {
                this.dateCurrent = date;
                this.weightCurrent = weight;
                const req = routeSave.createReq();
                req.type = TYPES.CURRENT;
                req.date = date;
                req.weight = weight;
                const res = await gate.send(req, routeSave);
                if (res) await this.loadHistory();
            },
            onAdd(data) {
                this.dialogDisplay = true;
            },
        },
        async mounted() {
            // PARSE INPUT & DEFINE WORKING VARS
            const me = this;

            // DEFINE INNER FUNCTIONS
            /**
             * Reset Top Actions on component re-mount.
             */
            function addTopActions() {
                const actAdd = new Action();
                actAdd.icon = 'add';
                actAdd.action = function () {
                    me.dialogDisplay = true;
                };
                topActions.setActions([actAdd]);
            }

            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                addTopActions();
            }
        },
    };
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
