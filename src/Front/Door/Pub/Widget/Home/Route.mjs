/**
 * 'Home' route.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_Home_Route
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_Home_Route';
const I18N_PERIOD = 'opts.period';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Home_Route
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_Home_Route.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart} */
    const chart = spec['Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec['Fl32_Bwl_Front_Layout_TopActions$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Teq_User_Shared_Service_Route_Sign_Out.Factory} */
    const routeSignOut = spec['Fl32_Teq_User_Shared_Service_Route_Sign_Out#Factory$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Friend_List.Factory} */
    const routeFriends = spec['Fl32_Bwl_Shared_Service_Route_Friend_List#Factory$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item'];
    /** @type {Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl} */
    const editWeight = spec['Fl32_Bwl_Front_Widget_Edit_Weight$'];
    /** @type {Fl32_Bwl_Front_DataSource_Weight} */
    const dsWeights = spec['Fl32_Bwl_Front_DataSource_Weight$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Model_Profile_Home} */
    const modProfileHome = spec['Fl32_Bwl_Front_Door_Pub_Model_Profile_Home$'];
    /** @type {typeof Fl32_Bwl_Front_Struct_Options_Period} */
    const OptPeriod = spec['Fl32_Bwl_Front_Struct_Options_Period#'];
    /** @type {Fl32_Bwl_Front_Struct_Options_Period} */
    const optionsPeriod = spec['Fl32_Bwl_Front_Struct_Options_Period$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Widget_Home_Route_SeriesLoader} */
    const loader = spec['Fl32_Bwl_Front_Door_Pub_Widget_Home_Route_SeriesLoader$'];

    // DEFINE WORKING VARS
    /** @type {typeof Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl.TYPES} */
    const TYPES = editWeight.TYPES;
    const template = `
<q-page class="t-grid app-home">
    <div class="t-grid cols gutter-xs">
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
    <div class="id-filters t-grid cols gutter-xs" style="grid-template-columns: 2fr 1fr">
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
</q-page>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Home_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {chart, editWeight},
        data: function () {
            return {
                chartData: null, // data set to visualize with Chart widget
                current: null,
                dataSet: null,
                dateFrom: new Date(),
                dateTo: new Date(),
                dialogDisplay: false,
                optsDataSet: [],
                period: {label: 'All', value: OptPeriod.ALL},
                target: null,
                weightEdit: null,
                weightType: TYPES.CURRENT,
            };
        },
        computed: {
            optsPeriod() {
                return optionsPeriod.getItems(this, I18N_PERIOD);
            },
        },
        methods: {
            editWeightCurrent() {
                this.dialogDisplay = true;
                this.weightType = TYPES.CURRENT;
                this.weightEdit = this.current;
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
                const friendId = this.dataSet?.value;
                const data = await loader.load(
                    friendId,
                    this.dateFrom,
                    this.dateTo,
                    this.target
                );
                data.namePrimary = this.$t('wg.chart.current');
                data.nameSecondary = (friendId) ? this.dataSet.label : this.$t('wg.chart.target');
                this.chartData = data;
            },
            async loadOptsDataSet() {
                const result = [{label: this.$t('route.home.dataSet.personal'), value: DEF.DEF_DATA_SET_ID}];
                const req = routeFriends.createReq();
                // noinspection JSValidateTypes
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_List.Response} */
                const res = await gate.send(req, routeFriends);
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
                let unixTime = 0;
                const to = new Date();
                to.setHours(0, 0, 0, 0);
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                if (this.period.value === OptPeriod.ALL) {
                    // leave as is
                } else if (this.period.value === OptPeriod.WEEK_1) {
                    unixTime = (new Date()).setDate(now.getDate() - 7);
                } else if (this.period.value === OptPeriod.WEEK_2) {
                    unixTime = (new Date()).setDate(now.getDate() - 14);
                } else if (this.period.value === OptPeriod.MONTH_1) {
                    unixTime = (new Date()).setMonth(now.getMonth() - 1);
                } else if (this.period.value === OptPeriod.MONTH_2) {
                    unixTime = (new Date()).setMonth(now.getMonth() - 2);
                } else if (this.period.value === OptPeriod.MONTH_6) {
                    unixTime = (new Date()).setMonth(now.getMonth() - 6);
                }
                const from = new Date(unixTime);
                from.setHours(0, 0, 0, 0);
                this.dateFrom = from;
                this.dateTo = to;
            },
            async setWeights() {
                await dsWeights.loadFromServer(true);
                this.current = dsWeights.getCurrent();
                this.target = dsWeights.getTarget();

            },
        },
        watch: {
            dataSet(current, old) {
                if (current !== old) {
                    this.loadChartData();
                    modProfileHome.dataSetId = current.value;
                }
            },
            period(current, old) {
                this.setPeriods();
                if (current !== old) {
                    this.loadChartData();
                    modProfileHome.periodId = current.value;
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
                    const req = routeSignOut.createReq();
                    await gate.send(req, routeSignOut);
                    self.location.reload();
                };
                topActions.setActions([actAdd]);
            }

            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                addTopActions();
                this.period.value = modProfileHome.periodId;
                this.period.label = this.$t(`${I18N_PERIOD}.${modProfileHome.periodId}`);
                this.setPeriods();
                await Promise.all([
                    this.setWeights(),
                    this.loadOptsDataSet(),
                ]);
                for (const one of this.optsDataSet)
                    if (one.value === modProfileHome.dataSetId) this.dataSet = one;

            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
