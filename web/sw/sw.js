/** @type {typeof TeqFw_Web_Sw_Worker} */
import ServiceWorker from '../src/@teqfw/web/Sw/Worker.mjs';

const sw = new ServiceWorker();
sw.setup(self, 'sw');
