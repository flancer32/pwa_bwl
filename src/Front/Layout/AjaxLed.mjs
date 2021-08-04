/**
 * Led-widget to indicate that AJAX request is executing.
 *
 * @namespace Fl32_Bwl_Front_Layout_AjaxLed
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Layout_AjaxLed';

/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Layout_AjaxLed
 * @returns {Fl32_Bwl_Front_Layout_AjaxLed.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Bwl_Front_Model_Gate_AjaxLed} */
    const modAjaxLed = spec['TeqFw_Web_Front_Api_Gate_IAjaxLed$'];

    // DEFINE WORKING VARS
    const led = modAjaxLed.getData(); // reactive object from model
    const template = `
<q-btn dense flat round icon="lens" size="8.5px" :color="color" />
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Layout_AjaxLed
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        computed: {
            color() {
                return (led.value) ? 'green' : 'grey';
            }
        },
    };
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

