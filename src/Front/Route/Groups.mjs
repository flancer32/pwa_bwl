const ACTIVE = 'active';
const ADMIN_NAME = 'adminName';
const DATE = 'date';
const GROUP_ID = 'groupId';
const GROUP_NAME = 'groupName';

const columns = [
    {name: DATE, label: 'Date', field: DATE, align: 'left'},
    {name: GROUP_NAME, label: 'Name', field: GROUP_NAME, align: 'left'},
    {name: ADMIN_NAME, label: 'Admin', field: ADMIN_NAME, align: 'left'},
    {name: ACTIVE, label: 'Active', field: ACTIVE, align: 'right'},
    {name: GROUP_ID, label: 'ID', field: GROUP_ID, align: 'right'},
];

const template = `
<div>
    <q-table
            :columns="columns"
            :rows-per-page-options="[0]"
            :rows="rows"
            hide-bottom
            hide-no-data
            row-key="${GROUP_ID}"
    >
    </q-table>
</div>
`;

export default function Fl32_Bwl_Front_Route_Groups(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // destructuring instance singleton
    /** @type {Fl32_Bwl_Front_Gate_Group_List.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Group_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Group_List_Response} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Group_List#Response']; // class constructor

    return {
        name: 'RouteGroups',
        template,
        async mounted() {
            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                /** @type {Fl32_Bwl_Shared_Service_Route_Group_List_Response} */
                const res = await gate(new Request());
                this.rows = res.items;
            }
        },
        setup() {
            const loading = ref(false);
            const rows = ref([]);
            return {
                columns,
                loading,
                rows,
            };
        }
    };
}
