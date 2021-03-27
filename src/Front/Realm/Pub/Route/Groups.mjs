/**
 * Root widget for 'Groups' route.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_Route_Groups
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_Route_Groups';
const ACTIVE = 'active';
const GROUP_ID = 'groupId';
const GROUP_NAME = 'groupName';

const template = `
<div>
    <q-table
            :columns="columns"
            :rows-per-page-options="[0]"
            :rows="rows"
            @row-click="onRowClick"
            hide-bottom
            hide-no-data
            row-key="${GROUP_ID}"
    >
    </q-table>
    <edit-group
        :display="dialogDisplay"
        @onHide="dialogDisplay=false"
        v-model="selectedItem"
    ></edit-group>
</div>
`;

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Groups
 * @returns {Fl32_Bwl_Front_Realm_Pub_Route_Groups.vueCompTmpl}
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // destructuring instance singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS]; // Vue component singleton
    /** @type {Fl32_Bwl_Front_Widget_Edit_Group} */
    const editGroup = spec['Fl32_Bwl_Front_Widget_Edit_Group$']; // Vue component singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item']; // class constructor
    /** @type {Fl32_Bwl_Front_Gate_Group_List.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Group_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Group_List_Response} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Group_List#Response']; // class constructor

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Groups
     */
    return {
        name: NS,
        template,
        components: {editGroup},
        data() {
            return {
                /** @type {Fl32_Bwl_Shared_Service_Data_Group_Item[]} */
                rows: [],
                dialogDisplay: false,
                selectedItem: null,
            };
        },
        methods: {
            onRowClick(evt, row) {
                const groupId = row[GROUP_ID];
                this.selectedItem = null;
                for (const one of this.rows) {
                    if (one.groupId === groupId) this.selectedItem = one;
                }
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
                addTopActions();
                /** @type {Fl32_Bwl_Shared_Service_Route_Group_List_Response} */
                const res = await gate(new Request());
                this.rows = res.items;
            }
        },
        setup() {
            const columns = [
                // {name: DATE, label: i18n.t('groups.date'), field: DATE, align: 'left'},
                {name: GROUP_NAME, label: i18n.t('groups.name'), field: GROUP_NAME, align: 'left'},
                // {name: ADMIN_NAME, label: i18n.t('groups.admin'), field: ADMIN_NAME, align: 'left'},
                {name: ACTIVE, label: i18n.t('groups.active'), field: ACTIVE, align: 'right'},
                // {name: GROUP_ID, label: i18n.t('groups.id'), field: GROUP_ID, align: 'right'},
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

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
