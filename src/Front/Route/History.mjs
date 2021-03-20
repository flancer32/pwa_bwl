/**
 * Layout widget for context related actions.
 * This widget is placed into DI container as 'Fl32_Bwl_Defaults.DI_TOP_ACTIONS'.
 *
 * @namespace Fl32_Bwl_Front_Route_History
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Route_History';
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
        @onHide="dialogDisplay=false"
        @onSubmit="onEditHistorySubmit"
    ></edit-history>
</div>
`;


function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // destructuring instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS]; // Vue component singleton
    /** @type {Fl32_Bwl_Front_Widget_Edit_History} */
    const editHistory = spec['Fl32_Bwl_Front_Widget_Edit_History$']; // Vue component singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item']; // class constructor
    /** @type {Fl32_Bwl_Front_DataSource_Weight} */
    const dsWeights = spec['Fl32_Bwl_Front_DataSource_Weight$']; // instance singleton
    /** @type {Fl32_Bwl_Front_Gate_Weight_History_List.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Weight_History_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_History_List_Request} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Request']; // class constructor
    const {formatDate} = spec['Fl32_Bwl_Shared_Util']; // ES6 module destructing

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Route_History
     */
    return {
        name: NS,
        template,
        components: {editHistory},
        data() {
            return {
                dateCurrent: new Date((new Date()).setDate((new Date()).getDate() - 4)),
                dialogDisplay: false,
                weightCurrent: 0,
            };
        },
        computed: {},
        methods: {
            onEditHistorySubmit(date, weight) {
                this.dateCurrent = date;
                this.weightCurrent = weight;
            },
            onRowClick(evt, row) {
                console.log('clicked on', evt, row);
                const dateStr = row[ID];
                this.dateCurrent = new Date(dateStr);
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

            /**
             *
             * @param {Fl32_Bwl_Shared_Service_Data_Weight_History_Item[]} items
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
            if (await session.checkUserAuthenticated(this.$router)) {
                addTopActions();
                this.weightCurrent = await dsWeights.getCurrent();
                /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List_Response} */
                const res = await gate(new Request());
                this.rows = prepareItems(res.items);
            }
        },
        setup() {
            const columns = [
                {name: DATE, label: i18n.t('history.date'), field: DATE, align: 'center'},
                {name: WEIGHT, label: i18n.t('history.weight'), field: WEIGHT, align: 'right'},
                {name: DELTA, label: i18n.t('history.delta'), field: DELTA, align: 'right',},
                {name: PERCENT, label: i18n.t('history.percent'), field: PERCENT, align: 'right',},
            ];
            const loading = ref(false);
            const rows = ref([]);
            return {
                columns,
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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
