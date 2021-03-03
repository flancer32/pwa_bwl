const template = `
<q-layout view="hHh lpr fFf">
    <q-header reveal elevated glossy class="bg-primary text-white">
        <q-bar>
          <q-btn dense flat round icon="lens" size="8.5px" color="grey" />
          <q-space></q-space>
          <div class="overflow-hidden" style="height: 20px">BWL</div>
          <q-space></q-space>
          <q-btn dense flat icon="logout"></q-btn>
        </q-bar>
    </q-header>

<!--    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>-->
<!--        &lt;!&ndash; drawer content &ndash;&gt;-->
<!--    </q-drawer>-->

<!--    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated>-->
<!--        &lt;!&ndash; drawer content &ndash;&gt;-->
<!--    </q-drawer>-->

    <q-page-container>
        <router-view/>
    </q-page-container>

      <q-footer elevated>
        <q-toolbar class="t-grid cols">
            <q-btn dense flat icon="settings" v-on:click="$router.push('/settings')"></q-btn>
            <q-btn dense flat icon="group" v-on:click="$router.push('/groups')"></q-btn>
            <q-btn dense flat icon="history" v-on:click="$router.push('/history')"></q-btn>
            <q-btn dense flat icon="home" v-on:click="$router.push('/')"></q-btn>
        </q-toolbar>
      </q-footer>
</q-layout>
`;

export default function Fl32_Bwl_Front_Layout_Base(spec) {
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
