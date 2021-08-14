/**
 * Initialize development environment to run dev tests.
 */
import $path from 'path';
import $url from 'url';
import Container from '@teqfw/di';

/* Resolve paths to main folders */
const {path: currentScript} = $url.parse(import.meta.url);
const pathScript = $path.dirname(currentScript);
const pathPrj = $path.join(pathScript, '../..');
const pathNode = $path.join(pathPrj, 'node_modules');
const srcApp = $path.join(pathPrj, 'src');
const srcFl32User = $path.join(pathNode, '@flancer32/teq_user/src');
const srcTeqFwCore = $path.join(pathNode, '@teqfw/core/src');
const srcTeqFwDi = $path.join(pathNode, '@teqfw/di/src');
const srcTeqFwHttp2 = $path.join(pathNode, '@teqfw/http2/src');
const srcTeqFwUiQuasar = $path.join(pathNode, '@teqfw/ui-quasar/src');
const srcTeqFwVue = $path.join(pathNode, '@teqfw/vue/src');
/* Create and setup DI container (once per all imports) */

/** @type {TeqFw_Di_Shared_Container} */
const container = new Container();
// add backend sources to map
container.addSourceMapping('Fl32_Bwl', srcApp, true, 'mjs');
container.addSourceMapping('Fl32_Teq_User', srcFl32User, true, 'mjs');
container.addSourceMapping('TeqFw_Core', srcTeqFwCore, true, 'mjs');
container.addSourceMapping('TeqFw_Di', srcTeqFwDi, true, 'mjs');
container.addSourceMapping('TeqFw_Http2', srcTeqFwHttp2, true, 'mjs');
container.addSourceMapping('TeqFw_Ui_Quasar', srcTeqFwUiQuasar, true, 'mjs');
container.addSourceMapping('TeqFw_Vue', srcTeqFwVue, true, 'mjs');

/**
 * Setup development environment (if not set before) and return DI container.
 *
 * @returns {Promise<TeqFw_Di_Shared_Container>}
 */
export default async function init() {
    // DEFINE INNER FUNCTIONS

    async function initConfig(container, rootPath) {
        /** @type {TeqFw_Core_Back_Config} */
        const config = await container.get('TeqFw_Core_Back_Config$');
        config.load({rootPath});  // load local configuration
    }

    async function initDb(container) {
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const rdb = await container.get('TeqFw_Db_Back_RDb_Connect$');
        await rdb.init();
        // const finalizer = function (boo) {
        //     debugger
        // };
        // const registry = new FinalizationRegistry(finalizer);
        // registry.register(rdb, 'payload');
    }

    async function initLogger(container) {
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = await container.get('TeqFw_Core_Shared_Logger$');
        logger.pause(false);
    }

    // MAIN FUNCTIONALITY
    /** @type {TeqFw_Core_Back_Config} */
    const config = await container.get('TeqFw_Core_Back_Config$');
    if (Object.keys(config.get()).length === 0) {
        // init env if has not been initiated before
        await initConfig(container, pathPrj);
        await initLogger(container);
        await initDb(container);
    }
    return container;
}
