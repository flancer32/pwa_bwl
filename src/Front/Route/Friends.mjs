/**
 * Root widget for 'Friends' route.
 *
 * @namespace Fl32_Bwl_Front_Route_Friends
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Route_Friends';
const ACTIVE = 'active';
const FRIEND_ID = 'friendId';
const FRIEND_NAME = 'friendName';

const template = `
<div>
    <q-table
            :columns="columns"
            :rows-per-page-options="[0]"
            :rows="rows"
            @row-click="onRowClick"
            hide-bottom
            hide-no-data
            row-key="${FRIEND_ID}"
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
 * @memberOf Fl32_Bwl_Front_Route_Friends
 * @returns {Fl32_Bwl_Front_Route_Friends.vueCompTmpl}
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

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Route_Friends
     */
    return {
        name: NS,
        template,
        components: {editGroup},
        data() {
            return {
                rows: [],
                dialogDisplay: false,
                selectedItem: null,
            };
        },
        methods: {
            onRowClick(evt, row) {
                const friendId = row[FRIEND_ID];
                this.selectedItem = null;
                for (const one of this.rows) {
                    if (one.friendId === friendId) this.selectedItem = one;
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
                this.rows = [];
            }
        },
        setup() {
            const columns = [
                {name: FRIEND_NAME, label: i18n.t('friends.name'), field: FRIEND_NAME, align: 'left'},
                {name: ACTIVE, label: i18n.t('friends.active'), field: ACTIVE, align: 'right'},
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

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    Factory as default,
};
