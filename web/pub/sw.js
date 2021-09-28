/** @type {typeof TeqFw_Web_Front_Api_ServiceWorker} */
import TeqFwServiceWorker from '../src/@teqfw/web/Front/Api/ServiceWorker.mjs';

const sw = new TeqFwServiceWorker();
sw.setup(self, 'pub');
