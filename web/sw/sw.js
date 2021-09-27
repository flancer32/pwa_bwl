import TeqFwServiceWorker from '../src/@teqfw/web/Front/Api/ServiceWorker.mjs';

/**
 * @type {TeqFw_Web_Front_Api_ServiceWorker}
 */
const sw = new TeqFwServiceWorker();
sw.setup(self);
