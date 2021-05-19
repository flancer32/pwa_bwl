/**
 * Root widget for 'Friends' route.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_Route_Friends
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_Route_Friends';
const FRIEND_ID = 'friendId';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Friends
 * @returns {Fl32_Bwl_Front_Realm_Pub_Route_Friends.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Front_Data_Config} */
    const config = spec[DEF.MOD_CORE.DI_CONFIG]; // named singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    /** @function {typeof TeqFw_Core_App_Shared_Util.formatDate} */
    const formatDate = spec['TeqFw_Core_App_Shared_Util#formatDate']; // function singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS]; // vue comp tmpl
    /** @type {Fl32_Bwl_Front_Realm_Pub_Widget_Friends_Dialog_Add} */
    const dialogAdd = spec['Fl32_Bwl_Front_Realm_Pub_Widget_Friends_Dialog_Add$']; // vue comp tmpl
    /** @type {Fl32_Bwl_Front_Widget_Edit_Group} */
    const editGroup = spec['Fl32_Bwl_Front_Widget_Edit_Group$']; // vue comp tmpl
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item']; // class
    /** @function {@type Fl32_Bwl_Front_Gate_Friend_Link_Code_Create.gate} */
    const gateCodeCreate = spec['Fl32_Bwl_Front_Gate_Friend_Link_Code_Create$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Request} */
    const ReqCodeCreate = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create#Request']; // class
    /** @function {@type Fl32_Teq_User_Front_Gate_RefLink_Create.gate} */
    const gateRefLinkCreate = spec['Fl32_Teq_User_Front_Gate_RefLink_Create$']; // function singleton
    /** @type {typeof Fl32_Teq_User_Shared_Service_Route_RefLink_Create_Request} */
    const ReqRefLinkCreate = spec['Fl32_Teq_User_Shared_Service_Route_RefLink_Create#Request']; // class
    /** @function {@type Fl32_Bwl_Front_Gate_Friend_List.gate} */
    const gateList = spec['Fl32_Bwl_Front_Gate_Friend_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Friend_List.Request} */
    const ReqList = spec['Fl32_Bwl_Shared_Service_Route_Friend_List#Request']; // class
    /** @type {typeof Fl32_Bwl_Shared_Service_Data_Friend_List_Item} */
    const DItem = spec['Fl32_Bwl_Shared_Service_Data_Friend_List_Item#']; //class

    // DEFINE WORKING VARS
    const template = `
<div>
    <q-table
            :columns="columns"
            :loading="loading"
            :rows-per-page-options="[0]"
            :rows="rows"
            @row-click="onRowClick"
            hide-bottom
            hide-no-data
            row-key="${FRIEND_ID}"
    >
        <template v-slot:loading>
            <q-inner-loading showing color="primary" />
        </template>
    </q-table>
    <dialog-add
        :display="dialogAddDisplay"
        @onHide="dialogAddDisplay=false"
        @onSubmit="onAddDialogSubmit"
    ></dialog-add>
</div>
`;

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Pub_Route_Friends
     */
    return {
        name: NS,
        template,
        components: {editGroup, dialogAdd},
        data() {
            return {
                dialogAddDisplay: false,
                loading: false,
                rows: [],
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
                this.dialogAddDisplay = true;
            },
            async onAddDialogSubmit(isFriend) {
                // DEFINE INNER FUNCTIONS

                /**
                 * Generate and share link to add new friendship relation.
                 */
                async function addFriend() {
                    const req = new ReqCodeCreate();
                    /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Response} */
                    const res = await gateCodeCreate(req);
                    const code = res.link.code;
                    // compose URL to add new friend
                    const host = `https://${config.urlBase}`;
                    const realm = `/${DEF.REALM_PUB}/#`;
                    const route = DEF.REALM_PUB_ROUTE_FRIENDS_ADD.replace(':code', code);
                    const url = `${host}${realm}${route}`;
                    // open sharing options or print out sign up link to console
                    if (self.navigator.share) {
                        // smartphone mode
                        const data = {
                            title: 'Bruderschaft Weight Loss',
                            text: i18n.t('route.friends.share.welcome'),
                            url,
                        };
                        await self.navigator.share(data);
                    } else {
                        // browser mode
                        console.log(`add friend url: ${url}`);
                    }
                }

                /**
                 * Generate and share link to add new user in downline.
                 */
                async function addDownline() {
                    // get referral link with limited lifetime
                    const req = new ReqRefLinkCreate();
                    /** @type {Fl32_Teq_User_Shared_Service_Route_RefLink_Create_Response} */
                    const res = await gateRefLinkCreate(req);
                    const code = res.link.refCode;
                    // compose URL to sign up
                    const host = `https://${config.urlBase}`;
                    const realm = `/${DEF.REALM_SIGN}/#`;
                    const route = DEF.REALM_SIGN_ROUTE_UP.replace(':refCode?', code);
                    const url = `${host}${realm}${route}`;
                    // open sharing options or print out sign up link to console
                    if (self.navigator.share) {
                        // smartphone mode
                        const data = {
                            title: 'Bruderschaft Weight Loss',
                            text: i18n.t('route.friends.share.welcome'),
                            url,
                        };
                        await self.navigator.share(data);
                    } else {
                        // browser mode
                        console.log(`sign up url: ${url}`);
                    }
                }

                // MAIN FUNCTIONALITY
                try {
                    if (isFriend) {
                        await addFriend();
                    } else {
                        await addDownline();
                    }
                } catch (err) {
                    console.log(`error: ${err}`);
                }
            },
        },
        async mounted() {
            // PARSE INPUT & DEFINE WORKING VARS
            const me = this;

            // DEFINE INNER FUNCTIONS
            /**
             * Reset 'Top Actions' commands on component re-mount.
             */
            function resetTopActions() {
                const actAdd = new Action();
                actAdd.icon = 'add';
                actAdd.action = async function () {
                    // DEFINE INNER FUNCTIONS
                    /**
                     *
                     * @returns {Promise<void>}
                     */
                    async function addNew() {
                        me.dialogAddDisplay = true; // display 'Add' dialog to select type of user: downline or friend
                    }

                    async function editSelected() {
                        me.dialogAddDisplay = true;
                    }

                    // MAIN FUNCTIONALITY
                    if (me.selectedItem) {
                        editSelected();
                    } else {
                        addNew();
                    }
                };
                topActions.setActions([actAdd]);
            }

            async function loadItems() {
                me.loading = true;
                const result = [];
                const req = new ReqList();
                const res = await gateList(req);
                if (res) result.push(...res.items);
                me.loading = false;
                return result;
            }

            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                resetTopActions();
                this.rows = await loadItems();
            }
        },
        setup() {
            const NAME = DItem.FRIEND_NAME;
            const STARTED = DItem.DATE_STARTED;
            const columns = [
                {name: NAME, label: i18n.t('route.friends.name'), field: NAME, align: 'left'},
                {
                    align: 'right',
                    field: STARTED,
                    format: (val) => formatDate(val),
                    label: i18n.t('route.friends.created'),
                    name: STARTED,
                },
            ];
            return {columns};
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
