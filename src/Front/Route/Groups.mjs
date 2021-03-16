const ACTIVE = 'active';
const ADMIN_NAME = 'adminName';
const DATE = 'date';
const GROUP_ID = 'groupId';
const GROUP_NAME = 'groupName';

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
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // destructuring instance singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS]; // Vue component singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item']; // class constructor
    /** @type {Fl32_Bwl_Front_Gate_Group_List.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Group_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Group_List_Response} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Group_List#Response']; // class constructor

    return {
        name: 'RouteGroups',
        template,
        async mounted() {
            // DEFINE INNER FUNCTIONS
            /**
             * Reset Top Actions on component re-mount.
             */
            function addTopActions() {
                const actAdd = new Action();
                actAdd.icon = 'add';
                actAdd.action = function () {
                    console.log('add group');
                };
                topActions.setActions([actAdd]);
            }

            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                addTopActions();
                /** @type {Fl32_Bwl_Shared_Service_Route_Group_List_Response} */
                const res = await gate(new Request());
                this.rows = res.items;
            }
        },
        setup() {
            const columns = [
                {name: DATE, label: i18n.t('groups.date'), field: DATE, align: 'left'},
                {name: GROUP_NAME, label: i18n.t('groups.name'), field: GROUP_NAME, align: 'left'},
                {name: ADMIN_NAME, label: i18n.t('groups.admin'), field: ADMIN_NAME, align: 'left'},
                {name: ACTIVE, label: i18n.t('groups.active'), field: ACTIVE, align: 'right'},
                {name: GROUP_ID, label: i18n.t('groups.id'), field: GROUP_ID, align: 'right'},
            ];
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
