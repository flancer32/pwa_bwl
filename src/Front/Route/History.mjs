const template = `
<p>History</p>
`;

export default function Fl32_Bwl_Front_Route_History(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton

    return {
        name: 'RouteHistory',
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
