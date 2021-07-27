/**
 * Base layout widget for 'sign' realm.
 *
 * @namespace Fl32_Bwl_Front_Layout_Sign
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Layout_Sign';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Layout_Sign
 * @returns {Fl32_Bwl_Front_Layout_Sign.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Vue_Front_Lib} */
    const VueLib = spec['TeqFw_Vue_Front_Lib$'];

    // DEFINE WORKING VARS
    const {ref} = VueLib.getVue();
    const template = `
<q-layout view="hHh lpr fFf">
    <q-header reveal elevated glossy class="bg-primary text-white">
        <q-bar>
          <q-btn dense flat round icon="lens" size="8.5px" color="grey" />
          <q-space></q-space>
          <div class="overflow-hidden" style="height: 20px">BWL</div>
          <q-space></q-space>
        </q-bar>
    </q-header>

    <q-page-container>
        <router-view/>
    </q-page-container>

</q-layout>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Layout_Sign
     */
    return {
        name: NS,
        template,
        components: {},
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
