const template = `
<q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
        <q-toolbar>
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

            <q-toolbar-title>
                <q-avatar>
                    <img src="/favicon.png" width="38px" height="38px">
                </q-avatar>
                {{stateTitle}}
            </q-toolbar-title>

            <q-btn dense flat round icon="more_vert" @click="toggleRightDrawer"/>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
        <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated>
        <!-- drawer content -->
    </q-drawer>

    <q-page-container>
        <router-view/>
    </q-page-container>

</q-layout>
`;

export default function Fl32_Bwl_Front_Layout_Main(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];
    const {mapState} = spec[DEF.MOD_VUE.DI_VUEX];
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];

    return {
        name: '',
        template,
        data() {
            return {};
        },
        computed: {
            isAuthenticated() {
                return this.stateUserAuthenticated !== null;
            },
            ...mapState({
                stateTitle: state => state.title,
                stateUserAuthenticated: state => state.user.authenticated,
            })
        },
        setup() {
            const leftDrawerOpen = ref(false);
            const rightDrawerOpen = ref(false);

            return {
                leftDrawerOpen,
                toggleLeftDrawer() {
                    leftDrawerOpen.value = !leftDrawerOpen.value;
                },

                rightDrawerOpen,
                toggleRightDrawer() {
                    rightDrawerOpen.value = !rightDrawerOpen.value;
                }
            };
        }
    };
}
