const DATE = 'date';
const DELTA = 'delta';
const WEIGHT = 'weight';

const template = `
<div>
    <q-table
            :columns="columns"
            :rows-per-page-options="[0]"
            :rows="rows"
            hide-bottom
            hide-no-data
            row-key="date"
    >
        <template v-slot:body-cell-delta="props">
            <q-td :props="props" :style="colorDelta(props.value)">{{props.value}}</q-td>
        </template>
    </q-table>
</div>
`;

const columns = [
    {name: 'date', label: 'Date', field: 'date', align: 'center'},
    {name: 'weight', label: 'Weight, kg', field: 'weight', align: 'right'},
    {
        name: 'delta',
        label: 'Delta, kg',
        field: 'delta',
        align: 'right',
    },

];

export default function Fl32_Bwl_Front_Route_History(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
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
                    const one = {
                        [DATE]: item.date,
                        [WEIGHT]: item.weight,
                        [DELTA]: (prev === null) ? '0' : (item.weight - prev).toFixed(1),
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
            const loading = ref(false);
            const rows = ref([]);
            return {
                columns,
                loading,
                rows,
                colorDelta: function (val) {
                    let result = null;
                    const num = Number.parseFloat(val);
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
