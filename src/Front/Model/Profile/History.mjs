/**
 * Encapsulate profile data for history route and save/restore it to/from local storage.
 * Profile elements are reactive.
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Model_Profile_History';

const WEIGHT_TYPE = 'weightType';

// MODULE'S CLASSES
export default class Fl32_Bwl_Front_Model_Profile_History {
    #weightType;
    /** @type {Function} */
    #unref;

    get weightType() {
        return this.#unref(this.#weightType);
    };

    set weightType(val) {
        this.#weightType.value = val;
        this.#save();
    };


    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Bwl_Front_Struct_Options_WeightType} */
        const Types = spec['Fl32_Bwl_Front_Struct_Options_WeightType#'];
        /** @type {TeqFw_Vue_Front_Lib} */
        const VueLib = spec['TeqFw_Vue_Front_Lib$'];
        // DEFINE WORKING VARS & PROPS
        const ref = VueLib.getVue().ref;
        this.#unref = VueLib.getVue().unref;

        // MAIN FUNCTIONALITY
        const store = self.localStorage;
        const json = store.getItem(NS);
        let data = JSON.parse(json);
        this.#weightType = data && data[WEIGHT_TYPE]
            ? ref(data[WEIGHT_TYPE]) : ref(Types.CURRENT);
    }

    #save() {
        const data = {
            [WEIGHT_TYPE]: this.weightType,
        };
        self.localStorage.setItem(NS, JSON.stringify(data));
    }

    /**
     * Get property as reactive object.
     * @return {*}
     */
    getWeightType() {
        return this.#weightType;
    }
}
