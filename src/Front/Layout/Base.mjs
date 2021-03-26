function Fl32_Bwl_Front_Layout_Base(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];
    const {mapState} = spec[DEF.MOD_VUE.DI_VUEX];
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];
    /** @type {Fl32_Bwl_Front_Layout_TopActions} */
    const topActions = spec['Fl32_Bwl_Front_Layout_TopActions$']; // Vue component singleton

    const template = `
<q-layout view="hHh lpr fFf">
    <q-header reveal elevated glossy class="bg-primary text-white">
        <q-bar>
          <q-btn dense flat round icon="lens" size="8.5px" color="grey" />
          <q-space></q-space>
          <div class="overflow-hidden" style="height: 20px">BWL</div>
          <q-space></q-space>
          <top-actions></top-actions>
        </q-bar>
    </q-header>

    <q-page-container>
        <router-view/>
    </q-page-container>

      <q-footer elevated>
        <q-toolbar class="t-grid cols">
            <q-btn dense flat icon="settings" v-on:click="$router.push('${DEF.ROUTE_SETTINGS}')"></q-btn>
            <q-btn dense flat icon="group" v-on:click="$router.push('${DEF.ROUTE_FRIENDS}')"></q-btn>
            <q-btn dense flat icon="history" v-on:click="$router.push('${DEF.ROUTE_HISTORY}')"></q-btn>
            <q-btn dense flat icon="home" v-on:click="$router.push('${DEF.ROUTE_HOME}')"></q-btn>
        </q-toolbar>
      </q-footer>
</q-layout>
`;

    return {
        name: 'BaseLayout',
        template,
        components: {topActions},
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
                },
                onTopRightClick() {
                    console.log('clicked!');
                },
            };
        }
    };
}

export default Fl32_Bwl_Front_Layout_Base;
