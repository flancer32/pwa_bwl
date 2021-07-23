/**
 * Root widget for 'History' route.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Route_History
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Route_History';
const DATE = 'date';
const DELTA = 'delta';
const ID = 'id';
const PERCENT = 'percent';
const WEIGHT = 'weight';

const template = `
<div>
    <q-table
            :columns="columns"
            :rows-per-page-options="[0]"
            :rows="rows"
            @row-click="onRowClick"
            hide-bottom
            hide-no-data
            row-key="${DATE}"
    >
        <template v-slot:body-cell-delta="props">
            <q-td :props="props" :style="colorDelta(props.value, props)">{{props.value}}</q-td>
        </template>
        <template v-slot:body-cell-percent="props">
            <q-td :props="props" :style="colorDelta(props.value, props)">{{props.value}}</q-td>
        </template>
    </q-table>
    <edit-history
        :date="dateCurrent"
        :display="dialogDisplay"
        :weight="weightCurrent"
        @onDelete="onEditHistoryRemove"
        @onHide="dialogDisplay=false"
        @onSubmit="onEditHistorySubmit"
    ></edit-history>
</div>
`;

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Route_History
 * @returns {Fl32_Bwl_Front_Door_Pub_Route_History.vueCompTmpl}
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    const i18n = spec[DEF.MOD_I18N.DI_I18N];
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS];
    /** @type {Fl32_Bwl_Front_Widget_Edit_History} */
    const editHistory = spec['Fl32_Bwl_Front_Widget_Edit_History$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item'];
    /** @type {Fl32_Bwl_Front_DataSource_Weight} */
    const dsWeights = spec['Fl32_Bwl_Front_DataSource_Weight$'];
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Types} */
    const TYPES = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Types'];
    /** @type {Function|Fl32_Bwl_Shared_Util.formatDate} */
    const formatDate = spec['Fl32_Bwl_Shared_Util#formatDate'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Factory} */
    const routeList = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Factory$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_Remove.Factory} */
    const routeRemove = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_Remove#Factory$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save.Factory} */
    const routeSave = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Factory$'];

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Route_History
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {editHistory},
        data() {
            return {
                columns: [],
                dateCurrent: new Date(),
                dialogDisplay: false,
                weightCurrent: 0,
            };
        },
        methods: {
            async loadHistory() {
                // DEFINE INNER FUNCTIONS
                /**
                 *
                 * @param {Fl32_Bwl_Shared_Service_Dto_Weight_History_Item[]} items
                 * @returns {[]}
                 */
                function prepareItems(items) {
                    const result = [];
                    items.sort((a, b) => (a.date < b.date) ? -1 : 1);
                    let prev = null;
                    for (const item of items) {
                        const dateStr = formatDate(i18n.language, item.date);
                        const one = {
                            [ID]: item.date,
                            [DATE]: dateStr,
                            [WEIGHT]: item.weight,
                            [DELTA]: (prev === null) ? '0' : (item.weight - prev).toFixed(1),
                            [PERCENT]: (prev === null) ? '0'
                                : (((Math.abs(item.weight - prev)) / prev) * 100).toFixed(2),
                        };
                        result.push(one);
                        prev = item.weight;
                    }
                    return result.reverse();
                }

                // MAIN FUNCTIONALITY
                // noinspection JSValidateTypes
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Response} */
                const res = await gate.send(routeList.createReq(), routeList);
                if (res) {
                    this.rows = prepareItems(res.items);
                }
            },
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
            onRowClick(evt, row) {
                const dateStr = row[ID];
                this.dateCurrent = new Date(`${dateStr}Z`); // add 'Z' to use as UTC
                this.weightCurrent = Number.parseFloat(row[WEIGHT]);
                this.dialogDisplay = true;
            }
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
                this.columns = [
                    {name: DATE, label: this.$t('route.history.date'), field: DATE, align: 'center'},
                    {name: WEIGHT, label: this.$t('route.history.weight'), field: WEIGHT, align: 'right'},
                    {name: DELTA, label: this.$t('route.history.delta'), field: DELTA, align: 'right',},
                    {name: PERCENT, label: this.$t('route.history.percent'), field: PERCENT, align: 'right',},
                ];
                addTopActions();
                await dsWeights.loadFromServer(true);
                this.weightCurrent = dsWeights.getCurrent();
                await this.loadHistory();
            }
        },
        setup() {
            const loading = ref(false);
            const rows = ref([]);
            return {
                loading,
                rows,
                colorDelta: function (val, props) {
                    let result = null;
                    const num = Number.parseFloat(props.row[DELTA]);
                    if (num < 0) {
                        result = 'color:green';
                    } else if (num > 0) {
                        result = 'color:red';
                    }
                    return result;
                }
            };
        }
    };
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

// MODULE'S EXPORT
export default Factory;
