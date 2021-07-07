/**
 * Root widget for 'Friends' route.
 *
 * @namespace Fl32_Bwl_Front_Area_Pub_Route_Friends
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Area_Pub_Route_Friends';
const FRIEND_ID = 'friendId';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Area_Pub_Route_Friends
 * @returns {Fl32_Bwl_Front_Area_Pub_Route_Friends.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {TeqFw_Web_Front_Api_Dto_Config} */
    const config = spec['TeqFw_Web_Front_Api_Dto_Config$'];
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @function {typeof TeqFw_Core_Shared_Util.formatDate} */
    const formatDate = spec['TeqFw_Core_Shared_Util#formatDate'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS];
    /** @type {Fl32_Bwl_Front_Area_Pub_Widget_Friends_Dialog_Add} */
    const dialogAdd = spec['Fl32_Bwl_Front_Area_Pub_Widget_Friends_Dialog_Add$'];
    /** @type {Fl32_Bwl_Front_Widget_Edit_Group} */
    const editGroup = spec['Fl32_Bwl_Front_Widget_Edit_Group$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Teq_User_Shared_Service_Route_RefLink_Create.Factory} */
    const routeRefLinkCreate = spec['Fl32_Teq_User_Shared_Service_Route_RefLink_Create#Factory$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Factory} */
    const routeFriendCodeCreate = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create#Factory$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Friend_List.Factory} */
    const routeList = spec['Fl32_Bwl_Shared_Service_Route_Friend_List#Factory$'];
    /** @type {typeof Fl32_Bwl_Shared_Service_Dto_Friend_List_Item} */
    const DItem = spec['Fl32_Bwl_Shared_Service_Dto_Friend_List_Item#'];

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
     * @memberOf Fl32_Bwl_Front_Area_Pub_Route_Friends
     */
    return {
        name: NS,
        template,
        components: {editGroup, dialogAdd},
        data() {
            return {
                dialogAddDisplay: false,
                columns: [],
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
                const me = this;
                // DEFINE INNER FUNCTIONS

                /**
                 * Generate and share link to add new friendship relation.
                 */
                async function addFriend() {
                    const req = new routeFriendCodeCreate.createReq();
                    // noinspection JSValidateTypes
                    /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Code_Create.Response} */
                    const res = await gate.send(req, routeFriendCodeCreate);
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
                            text: me.$t('route.friends.share.welcome'),
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
                    const req = routeRefLinkCreate.createReq();
                    // noinspection JSValidateTypes
                    /** @type {Fl32_Teq_User_Shared_Service_Route_RefLink_Create.Response} */
                    const res = await gate.send(req, routeRefLinkCreate);
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
                            text: me.$t('route.friends.share.welcome'),
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
                const req = routeList.createReq();
                const res = await gate.send(req, routeList);
                if (res) result.push(...res.items);
                me.loading = false;
                return result;
            }

            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                // setup columns
                const NAME = DItem.FRIEND_NAME;
                const STARTED = DItem.DATE_STARTED;
                this.columns = [
                    {name: NAME, label: this.$t('route.friends.name'), field: NAME, align: 'left'},
                    {
                        align: 'right',
                        field: STARTED,
                        format: (val) => formatDate(val),
                        label: this.$t('route.friends.created'),
                        name: STARTED,
                    },
                ];

                // load data
                resetTopActions();
                this.rows = await loadItems();
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
