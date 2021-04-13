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
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    /** @type {Fl32_Bwl_Front_Realm_Pub_Widget_Chart} */
    const chart = spec['Fl32_Bwl_Front_Realm_Pub_Widget_Chart$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS]; // vue comp tmpl
    /** @function {@type Fl32_Teq_User_Front_Gate_Sign_Out.gate} */
    const gateSignOut = spec['Fl32_Teq_User_Front_Gate_Sign_Out$']; // function singleton
    /** @type {typeof Fl32_Teq_User_Shared_Service_Route_Sign_Out_Request} */
    const ReqSignOut = spec['Fl32_Teq_User_Shared_Service_Route_Sign_Out#Request']; // class
    /** @function {@type Fl32_Bwl_Front_Gate_Weight_History_List.gate} */
    const gateHistory = spec['Fl32_Bwl_Front_Gate_Weight_History_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_History_List_Request} */
    const RequestHistory = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Request']; // class
    /** @function {@type Fl32_Bwl_Front_Gate_Profile_Get.gate} */
    const gateProfile = spec['Fl32_Bwl_Front_Gate_Profile_Get$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Profile_Get_Request} */
    const RequestProfile = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Request']; // class
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item']; // class
    /** @type {Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl} */
    const editWeight = spec['Fl32_Bwl_Front_Widget_Edit_Weight$']; // vue comp tmpl
    /** @type {Fl32_Bwl_Front_DataSource_Weight} */
    const dsWeights = spec['Fl32_Bwl_Front_DataSource_Weight$']; // instance singleton
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    // DEFINE WORKING VARS
    /** @type {Fl32_Bwl_Front_Widget_Edit_Weight.vueCompTmpl.TYPES} */
    const TYPES = editWeight.TYPES;
    const template = `
<div class="t-grid app-home">
    <div class="app-home-stats">
        <q-input
                :label="$t('home.start')"
                dense
                outlined
                readonly
                stack-label
                v-model="start"
                v-on:click="editWeightStart"
        ></q-input>
        <q-input
                :label="$t('home.current')"
                dense
                outlined stack-label
                readonly
                v-model="current"
                v-on:click="editWeightCurrent"
        ></q-input>
        <q-input
                :label="$t('home.target')"
                dense
                outlined
                readonly
                stack-label
                v-model="target"
                v-on:click="editWeightTarget"
        ></q-input>
    </div>
    <chart 
        :dataSet="chartData"
        :key="chartRedraw"
        :lineTarget="target"
    ></chart>
    <div class="id-filters t-grid cols" style="grid-template-columns: 2fr 1fr">
            <q-select
                    :label="$t('home.dataSet')"
                    :options="optsDataSet"
                    stack-label
                    v-model="dataSet"
            ></q-select>
            <q-select
                    :label="$t('home.period')"
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
                chartRedraw: 0, // redraw chart on data changes
                current: null,
                dataSet: {label: 'Персональные', value: 0},
                dateFrom: new Date(),
                dateTo: new Date(),
                dialogDisplay: false,
                period: {label: 'All', value: PERIOD_ALL},
                start: null,
                target: null,
                weightEdit: null,
                weightType: TYPES.CURRENT,
            };
        },
        computed: {
            optsDataSet() {
                return [
                    {label: 'Персональные', value: 0}
                ];
            },
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
            ...mapState({
                stateTitle: state => state.title,
                stateUserAuthenticated: state => state.user.authenticated,
            })
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
                this.chartRedraw++;
            },
            editWeightTarget() {
                this.dialogDisplay = true;
                this.weightType = TYPES.TARGET;
                this.weightEdit = this.target;
            },
            async loadDataSet() {
                const req = new RequestHistory();
                req.dateFrom = this.dateFrom;
                req.dateTo = this.dateTo;
                const resHistory = await gateHistory(req);
                const dataSet = {labels: [], data: []};
                for (const one of resHistory.items) {
                    dataSet.labels.push(new Date(one.date));
                    dataSet.data.push(one.weight);
                }
                this.chartData = dataSet;
            },
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
            ...mapMutations({
                setStateUserAuthenticated: 'user/setAuthenticated',
            }),
        },
        watch: {
            period(current, old) {
                this.setPeriods();
                if (current !== old) {
                    this.loadDataSet();
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
                await Promise.all([this.setWeights(), this.loadDataSet()]);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
