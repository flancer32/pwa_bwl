const template = `
<p>Settings</p>
`;

export default function Fl32_Bwl_Front_Realm_Pub_Route_Settings(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS]; // vue comp tmpl
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    // eslint-disable-next-line no-unused-vars
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item']; // class constructor

    return {
        name: 'RouteSettings',
        template,
        components: {},
        data: function () {
            return {};
        },
        computed: {},
        methods: {},
        async mounted() {
            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                topActions.setActions([]);
            }
        },
    };
}
