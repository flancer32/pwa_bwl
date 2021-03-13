const DATE = 'date';
const DELTA = 'delta';
const PERCENT = 'percent';
const WEIGHT = 'weight';

const template = `
<div>
    <q-table
            :columns="columns"
            :rows-per-page-options="[0]"
            :rows="rows"
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
</div>
`;


export default function Fl32_Bwl_Front_Route_History(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // destructuring instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    /** @type {Fl32_Bwl_Front_Gate_Weight_History_List.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Weight_History_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_History_List_Request} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Request']; // class constructor

    return {
        name: 'RouteHistory',
        template,
        async mounted() {
            // DEFINE INNER FUNCTIONS
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
                    const date = (new Date(item.date)).toLocaleDateString(i18n.language, {
                        day: 'numeric',
                        month: 'short',
                        weekday: 'short',
                        year: '2-digit',
                    });
                    const one = {
                        [DATE]: date,
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
