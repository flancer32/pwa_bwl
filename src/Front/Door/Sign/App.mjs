/**
 * Sign Up application.
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Sign_App';

export default class Fl32_Bwl_Front_Door_Sign_App {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Front_Defaults} */
        const DEF = spec['Fl32_Bwl_Front_Defaults$'];
        /** @type {TeqFw_Vue_Front_Lib} */
        const VueLib = spec['TeqFw_Vue_Front_Lib$'];
        /** @type {TeqFw_I18n_Front_Lib} */
        const I18nLib = spec['TeqFw_I18n_Front_Lib$'];
        /** @type {TeqFw_Ui_Quasar_Front_Lib} */
        const QuasarLib = spec['TeqFw_Ui_Quasar_Front_Lib$'];
        /** @type {TeqFw_Di_Shared_Container} */
        const container = spec['TeqFw_Di_Shared_Container$'];
        /** @type {Fl32_Bwl_Front_Layout_Centered} */
        const layoutCentered = spec['Fl32_Bwl_Front_Layout_Centered$'];
        /** @type {Fl32_Bwl_Front_Layout_Sign} */
        const layoutMain = spec['Fl32_Bwl_Front_Layout_Sign$'];
        /** @type {TeqFw_Web_Front_Model_Config} */
        const config = spec['TeqFw_Web_Front_Model_Config$'];

        // DEFINE WORKING VARS
        /** @type {{createApp}} */
        const Vue = VueLib.getVue();
        /** @type {{createRouter, createWebHashHistory}} */
        const Router = VueLib.getRouter();
        let root; // root component for the application

        const template = `
<layout-main></layout-main>
`;

        // DEFINE INNER FUNCTIONS


        // DEFINE INSTANCE METHODS
        /**
         * Initialize application.
         *
         * @return {Promise<void>}
         */
        this.init = async function () {
            // DEFINE INNER FUNCTIONS

            async function initI18n(app) {
                await I18nLib.init(['ru'], 'ru');
                const appProps = app.config.globalProperties;
                const i18n = I18nLib.getI18n();
                appProps.$t = function (key, options) {
                    // add package name if namespace is omitted in the key
                    const ns = this.$options.teq?.package;
                    if (ns && key.indexOf(':') <= 0) key = `${ns}:${key}`;
                    return i18n.t(key, options);
                }
            }

            function initQuasarUi(app) {
                const quasar = QuasarLib.getQuasar()
                app.use(quasar, {config: {}});
                quasar.iconSet.set(quasar.iconSet.svgMaterialIcons);
            }

            function initRouter(app) {
                /** @type {{addRoute}} */
                const router = Router.createRouter({
                    history: Router.createWebHashHistory(),
                    routes: [],
                });

                // setup application routes
                router.addRoute({
                    path: DEF.DOOR_SIGN_ROUTE_HOME,
                    component: () => container.get('Fl32_Bwl_Front_Door_Sign_Route_Home$')
                });
                router.addRoute({
                    path: DEF.DOOR_SIGN_ROUTE_UP,
                    props: true,
                    component: () => container.get('Fl32_Bwl_Front_Door_Sign_Route_Up$')
                });

                app.use(router);
            }

            // MAIN FUNCTIONALITY

            // create root component
            root = Vue.createApp({
                teq: {package: DEF.SHARED.NAME},
                name: NS,
                template,
            });

            // ... and add global available components
            root.component('LayoutCentered', layoutCentered);
            root.component('LayoutMain', layoutMain);

            // other initialization
            await config.init({door: DEF.SHARED.DOOR_SIGN});
            await initI18n(root);
            initQuasarUi(root);
            initRouter(root);
        }

        /**
         * Mount root component of the application to DOM element.
         *
         * @see https://v3.vuejs.org/api/application-api.html#mount
         *
         * @param {Element|string} rootContainer
         * @return {Object} the root component instance
         */
        this.mount = function (rootContainer) {
            return root.mount(rootContainer);
        }

    }
}
