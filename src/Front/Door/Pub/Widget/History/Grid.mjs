/**
 * Grid with historical data.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_History_Grid
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_History_Grid';
const DATE = 'date';
const DELTA = 'delta';
const ID = 'id';
const PERCENT = 'percent';
const WEIGHT = 'weight';
const EVT_ROW_CLICK = 'onRowClick';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_History_Grid
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_History_Grid.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {TeqFw_I18n_Front_Lib} */
    const i18n = spec['TeqFw_I18n_Front_Lib$'];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {TeqFw_Vue_Front_Lib} */
    const VueLib = spec['TeqFw_Vue_Front_Lib$'];
    /** @type {Function|Fl32_Bwl_Shared_Util.formatDate} */
    const formatDate = spec['Fl32_Bwl_Shared_Util#formatDate'];
    /** @type {Fl32_Bwl_Front_DataSource_Weight} */
    const dsWeights = spec['Fl32_Bwl_Front_DataSource_Weight$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Factory} */
    const routeList = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Factory$'];
    /** @type {Fl32_Bwl_Front_Door_Pub_Model_Profile_History} */
    const modProfile = spec['Fl32_Bwl_Front_Door_Pub_Model_Profile_History$'];

    // DEFINE WORKING VARS
    const template = `
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
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_History_Grid
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                columns: [],
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
                        const dateStr = formatDate(i18n.getLang(), item.date);
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
                const req = routeList.createReq();
                req.type = modProfile.weightType;
                // noinspection JSValidateTypes
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Response} */
                const res = await gate.send(req, routeList);
                if (res) {
                    this.rows = prepareItems(res.items);
                }
            },
            onRowClick(evt, row) {
                const dateStr = row[ID];
                const date = new Date(`${dateStr}Z`); // add 'Z' to use as UTC
                const weight = Number.parseFloat(row[WEIGHT]);
                this.$emit(EVT_ROW_CLICK, date, weight);
            }
        },
        emits: [EVT_ROW_CLICK],
        async mounted() {
            if (await session.checkUserAuthenticated(this.$router)) {
                // setup columns
                this.columns = [
                    {name: DATE, label: this.$t('route.history.date'), field: DATE, align: 'center'},
                    {name: WEIGHT, label: this.$t('route.history.weight'), field: WEIGHT, align: 'right'},
                    {name: DELTA, label: this.$t('route.history.delta'), field: DELTA, align: 'right',},
                    {name: PERCENT, label: this.$t('route.history.percent'), field: PERCENT, align: 'right',},
                ];
                // setup profile usage
                const watch = VueLib.getVue().watch;
                watch(modProfile.getWeightType(), (current, old) => {
                    this.loadHistory();
                });
                //
                await dsWeights.loadFromServer(true);
                this.weightCurrent = dsWeights.getCurrent();
                await this.loadHistory();
            }
        },
        setup() {
            // setup grid related vars
            const ref = VueLib.getVue().ref;
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

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

