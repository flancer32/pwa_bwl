const template = `
<div>
    <q-table
      :columns="columns"
      :loading="loading"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      :rows="rows"
      :virtual-scroll-slice-size="20"
      @virtual-scroll="onScroll"
      class="my-sticky-dynamic"
      row-key="index"
      title="Treats"
      virtual-scroll
    ></q-table>
</div>
`;

const columns = [
    {name: 'index', label: '#', field: 'index'},
    {name: 'date', label: 'Date', field: 'date'},
    {name: 'weight', label: 'Weight, kg', field: 'weight'},
    {name: 'delta', label: 'Delta, kg', field: 'delta'},

];

const seed = [
    {date: '2021/02/01', weight: 95.6, delta: 1.3},
    {date: '2021/02/02', weight: 95.5, delta: 0.3},
    {date: '2021/02/04', weight: 95.4, delta: -1.3},
    {date: '2021/02/05', weight: 95.3, delta: -.4},
    {date: '2021/02/06', weight: 95.2, delta: 1.5},
    {date: '2021/02/07', weight: 95.1, delta: -1.6},
    {date: '2021/02/08', weight: 95.8, delta: -2.3},
    {date: '2021/02/09', weight: 95.7, delta: 0.8},
    {date: '2021/02/10', weight: 95.9, delta: -.7},
];

// we generate lots of rows here
let allRows = [];
for (let i = 0; i < 500; i++) {
    allRows = allRows.concat(seed.slice(0).map(r => ({...r})));
}
allRows.forEach((row, index) => {
    row.index = index;
});

const pageSize = 20;
const lastPage = Math.ceil(allRows.length / pageSize);
console.log(`pageSize: ${pageSize}; lastPage: ${lastPage};`);

export default function Fl32_Bwl_Front_Route_History(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const {ref, computed, nextTick} = spec[DEF.MOD_VUE.DI_VUE];    // destructuring instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton

    return {
        name: 'RouteHistory',
        template,
        async mounted() {
            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                console.log('started');
            }
        },
        setup() {
            const nextPage = ref(2);
            const loading = ref(false);
            const rows = computed(() => {
                console.log(`pageSize: ${pageSize}; nextPage: ${nextPage.value};`);
                const from = 0;
                const to = pageSize * (nextPage.value - 1);
                console.log(`${from}-${to}`);
                return allRows.slice(from, to);
            });
            return {
                columns,
                rows,
                nextPage,
                loading,

                pagination: {
                    rowsPerPage: 0,
                    rowsNumber: allRows.length
                },

                onScroll(details) {
                    const {index, from, to, direction, ref} = details;
                    console.log(`${index}: ${from}-${to} / ${direction};`);
                    const lastIndex = rows.value.length - 1;
                    console.log(`to: ${to}; lastIndex: ${lastIndex}; nextPage: ${nextPage.value}; lastPage: ${lastPage};`);
                    const cond1 = loading.value !== true;
                    const cond2 = nextPage.value < lastPage;
                    const cond3 = to === lastIndex;
                    console.log(`${cond1} / ${cond2} / ${cond3}`);
                    if (cond1 && cond2 && cond3) {
                        loading.value = true;

                        setTimeout(() => {
                            nextPage.value++;
                            nextTick(() => {
                                ref.refresh();
                                loading.value = false;
                            });
                        }, 500);
                    }
                }
            };
        }
    };
}
