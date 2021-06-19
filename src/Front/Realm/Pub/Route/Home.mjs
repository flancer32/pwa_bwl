/**
 * Home route.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_Route_Home
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_Route_Home';
const PERIOD_ALL = 'all';
const PERIOD_MONTH_1 = 'm1';
const PERIOD_MONTH_2 = 'm2';
const PERIOD_MONTH_6 = 'm6';
const PERIOD_WEEK_1 = 'w1';
const PERIOD_WEEK_2 = 'w2';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Home
 * @returns {Fl32_Bwl_Front_Realm_Pub_Route_Home.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$']; // singleton
    /** @type {Fl32_Bwl_Front_Realm_Pub_Widget_Chart} */
    const chart = spec['Fl32_Bwl_Front_Realm_Pub_Widget_Chart$'];
    /** @type {typeof Fl32_Bwl_Front_Realm_Pub_Widget_Chart.ChartData} */
    const ChartData = spec['Fl32_Bwl_Front_Realm_Pub_Widget_Chart#ChartData'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS]; // vue comp tmpl
    /** @function {@type Fl32_Teq_User_Front_Gate_Sign_Out.gate} */
    const gateSignOut = spec['Fl32_Teq_User_Front_Gate_Sign_Out$']; // function singleton
    /** @type {typeof Fl32_Teq_User_Shared_Service_Route_Sign_Out.Request} */
    const ReqSignOut = spec['Fl32_Teq_User_Shared_Service_Route_Sign_Out#Request']; // class
    /** @function {@type Fl32_Bwl_Front_Gate_Weight_History_List.gate} */
    const gateHistory = spec['Fl32_Bwl_Front_Gate_Weight_History_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_History_List.Request} */
    const ReqHistory = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Request']; // class
    /** @function {@type Fl32_Bwl_Front_Gate_Friend_List.gate} */
    const gateList = spec['Fl32_Bwl_Front_Gate_Friend_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_List.Request} */
    const ReqList = spec['Fl32_Bwl_Shared_Service_Route_Friend_List#Request']; // class
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item']; // class
    /** @type {Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl} */
    const editWeight = spec['Fl32_Bwl_Front_Widget_Edit_Weight$']; // vue comp tmpl
    /** @type {Fl32_Bwl_Front_DataSource_Weight} */
    const dsWeights = spec['Fl32_Bwl_Front_DataSource_Weight$']; // instance singleton

    // DEFINE WORKING VARS
    /** @type {Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl.TYPES} */
    const TYPES = editWeight.TYPES;
    const template = `
<div class="t-grid app-home">
    <div class="app-home-stats">
        <q-input
                :label="$t('route.home.start')"
                dense
                outlined
                readonly
                stack-label
                v-model="start"
                v-on:click="editWeightStart"
        ></q-input>
        <q-input
                :label="$t('route.home.current')"
                dense
                outlined stack-label
                readonly
                v-model="current"
                v-on:click="editWeightCurrent"
        ></q-input>
        <q-input
                :label="$t('route.home.target')"
                dense
                outlined
                readonly
                stack-label
                v-model="target"
                v-on:click="editWeightTarget"
        ></q-input>
    </div>
    <chart 
        :chartData="chartData"
    ></chart>
    <div class="id-filters t-grid cols" style="grid-template-columns: 2fr 1fr">
            <q-select
                    :label="$t('route.home.dataSet.label')"
                    :options="optsDataSet"
                    stack-label
                    v-model="dataSet"
            ></q-select>
            <q-select
                    :label="$t('route.home.period')"
                    :options="optsPeriod"
                    stack-label
                    v-model="period"
            ></q-select>
    </div>
    <edit-weight
        :display="dialogDisplay"
        :weight="weightEdit"
        :type="weightType"
        @onHide="dialogDisplay=false"
        @onSubmit="editWeightSubmit"
    ></edit-weight>
</div>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Home
     */
    return {
        name: NS,
        template,
        components: {chart, editWeight},
        data: function () {
            return {
                chartData: null, // data set to visualize with Chart widget
                current: null,
                dataSet: {label: this.$t('route.home.dataSet.personal'), value: 0},
                dateFrom: new Date(),
                dateTo: new Date(),
                dialogDisplay: false,
                optsDataSet: [],
                period: {label: 'All', value: PERIOD_ALL},
                start: null,
                target: null,
                weightEdit: null,
                weightType: TYPES.CURRENT,
            };
        },
        computed: {
            optsPeriod() {
                return [
                    {label: '1 week', value: PERIOD_WEEK_1},
                    {label: '2 weeks', value: PERIOD_WEEK_2},
                    {label: '1 month', value: PERIOD_MONTH_1},
                    {label: '2 months', value: PERIOD_MONTH_2},
                    {label: '6 months', value: PERIOD_MONTH_6},
                    {label: 'All', value: PERIOD_ALL},
                ];
            },
        },
        methods: {
            editWeightCurrent() {
                this.dialogDisplay = true;
                this.weightType = TYPES.CURRENT;
                this.weightEdit = this.current;
            },
            editWeightStart() {
                this.dialogDisplay = true;
                this.weightType = TYPES.START;
                this.weightEdit = this.start;
            },
            async editWeightSubmit() {
                await this.setWeights();
                await this.loadChartData();
            },
            editWeightTarget() {
                this.dialogDisplay = true;
                this.weightType = TYPES.TARGET;
                this.weightEdit = this.target;
            },
            async loadChartData() {
                const req = new ReqHistory();
                req.dateFrom = this.dateFrom;
                req.dateTo = this.dateTo;
                req.friendId = this.dataSet?.value;
                const resHistory = await gateHistory(req);
                const dataSet = {labels: [], data: []};
                for (const one of resHistory.items) {
                    dataSet.labels.push(new Date(one.date));
                    dataSet.data.push(one.weight);
                }
                const data = new ChartData();
                data.series = dataSet;
                // friendId = 0 for personal data; don't draw the target for friends
                data.target = (req.friendId) ? null : this.target;
                this.chartData = data;
            },
            async loadOptsDataSet() {
                const result = [{label: this.$t('route.home.dataSet.personal'), value: 0}];
                const req = new ReqList();
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_List.Response} */
                const res = await gateList(req);
                if (res && Array.isArray(res.items)) {
                    for (const one of res.items) {
                        const item = {label: one.friendName, value: one.friendId};
                        result.push(item);
                    }
                }
                this.optsDataSet = result;
            },
            /**
             * Reset period begin/end on 'Period' selector changes.
             */
            setPeriods() {
                this.dateFrom = new Date(0);
                this.dateTo = new Date();
                const now = new Date();
                if (this.period.value === PERIOD_ALL) {
                    // leave as is
                } else if (this.period.value === PERIOD_WEEK_1) {
                    this.dateFrom = (new Date()).setDate(now.getDate() - 7);
                } else if (this.period.value === PERIOD_WEEK_2) {
                    this.dateFrom = (new Date()).setDate(now.getDate() - 14);
                } else if (this.period.value === PERIOD_MONTH_1) {
                    this.dateFrom = (new Date()).setMonth(now.getMonth() - 1);
                } else if (this.period.value === PERIOD_MONTH_2) {
                    this.dateFrom = (new Date()).setMonth(now.getMonth() - 2);
                } else if (this.period.value === PERIOD_MONTH_6) {
                    this.dateFrom = (new Date()).setMonth(now.getMonth() - 6);
                }
            },
            async setWeights() {
                await dsWeights.loadFromServer(true);
                this.current = await dsWeights.getCurrent();
                this.start = await dsWeights.getStart();
                this.target = await dsWeights.getTarget();
            },
        },
        watch: {
            dataSet(current, old) {
                if (current !== old) {
                    this.loadChartData();
                }
            },
            period(current, old) {
                this.setPeriods();
                if (current !== old) {
                    this.loadChartData();
                }
            }
        },
        async mounted() {
            // DEFINE INNER FUNCTIONS
            /**
             * Reset Top Actions on component re-mount.
             */
            function addTopActions() {
                const actAdd = new Action();
                actAdd.icon = 'logout';
                actAdd.action = async function () {
                    const req = new ReqSignOut();
                    await gateSignOut(req);
                    self.location.reload();
                };
                topActions.setActions([actAdd]);
            }

            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                addTopActions();
                this.setPeriods();
                await Promise.all([
                    this.setWeights(),
                    this.loadOptsDataSet(),
                    this.loadChartData(),
                ]);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
