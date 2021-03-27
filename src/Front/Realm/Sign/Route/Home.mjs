/**
 * Home route for '/sign' realm.
 *
 * @namespace Fl32_Bwl_Front_Realm_Sign_Route_Home
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Sign_Route_Home';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Sign_Route_Home
 * @returns {Fl32_Bwl_Front_Realm_Sign_Route_Home.vueCompTmpl}
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    const template = `
<div class="t-grid app-home">
    <span>HOME</span>
</div>
`;

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Sign_Route_Home
     */
    return {
        name: NS,
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

        },
        setup(props, context) {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
