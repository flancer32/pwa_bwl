/**
 * Model with reactive data to represent Ajax LED.
 *
 * @implements TeqFw_Web_Front_Api_Gate_IAjaxLed
 */
export default class Fl32_Bwl_Front_Model_Gate_AjaxLed {
    #data;

    constructor(spec) {
        /** @type {TeqFw_Vue_Front_Lib} */
        const VueLib = spec['TeqFw_Vue_Front_Lib$'];
        this.#data = VueLib.getVue().ref(false);
    }

    getData() {
        return this.#data;
    }

    off() {
        this.#data.value = false;
    }

    on() {
        this.#data.value = true;
    }

    reset() {
        this.#data.value = false;
    }
}
