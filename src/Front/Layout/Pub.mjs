/**
 * Base layout widget for 'pub' realm.
 *
 * @namespace Fl32_Bwl_Front_Layout_Pub
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Layout_Pub';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Layout_Pub
 * @returns {Fl32_Bwl_Front_Layout_Pub.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Shared_Defaults} */
    const DEF = spec['Fl32_Bwl_Shared_Defaults$'];
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];
    /** @type {Fl32_Bwl_Front_Layout_TopActions} */
    const topActions = spec['Fl32_Bwl_Front_Layout_TopActions$']; // vue comp tmpl

    // DEFINE WORKING VARS
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
            <q-btn dense flat icon="settings" v-on:click="$router.push('${DEF.REALM_PUB_ROUTE_SETTINGS}')"></q-btn>
            <q-btn dense flat icon="group" v-on:click="$router.push('${DEF.REALM_PUB_ROUTE_FRIENDS}')"></q-btn>
            <q-btn dense flat icon="history" v-on:click="$router.push('${DEF.REALM_PUB_ROUTE_HISTORY}')"></q-btn>
            <q-btn dense flat icon="home" v-on:click="$router.push('${DEF.REALM_PUB_ROUTE_HOME}')"></q-btn>
        </q-toolbar>
      </q-footer>
</q-layout>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Layout_Pub
     */
    return {
        name: NS,
        template,
        components: {topActions},
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

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
