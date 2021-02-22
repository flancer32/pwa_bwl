const template = `
<p>HOME</p>
`;

export default function Fl32_Bwl_Front_Route_Home(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    return {
        name: 'RouteHome',
        template,
        components: {},
        data: function () {
            return {};
        },
        computed: {
            ...mapState({
                stateTitle: state => state.title,
                stateUserAuthenticated: state => state.user.authenticated,
            })
        },
        methods: {
            ...mapMutations({
                setStateUserAuthenticated: 'user/setAuthenticated',
            }),
        },
        async mounted() {
            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                console.log('authenticated.');
            }
        },
    };
}
