const template = `
<p>Settings</p>
`;

export default function Fl32_Bwl_Front_Route_Settings(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton

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
            }
        },
    };
}
