/**
 * Encapsulate profile data for home page and save/restore it in front storage.
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Model_Profile_Home';

const DATA_SET_ID = 'dataSetId';
const PERIOD_ID = 'periodId';

// MODULE'S CLASSES
export default class Fl32_Bwl_Front_Model_Profile_Home {
    #periodId;
    #dataSetId;
    /** @type {typeof Fl32_Bwl_Front_Struct_Options_Period} */
    #OptPeriod;

    get periodId() {return this.#periodId};

    set periodId(val) {
        this.#periodId = val;
        this.#save();
    };

    get dataSetId() {return this.#dataSetId};

    set dataSetId(val) {
        this.#dataSetId = val;
        this.#save();
    };

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Front_Defaults} */
        const DEF = spec['Fl32_Bwl_Front_Defaults$'];
        this.#OptPeriod = spec['Fl32_Bwl_Front_Struct_Options_Period#'];

        const store = self.localStorage;
        const json = store.getItem(NS);
        let data = JSON.parse(json);
        this.#periodId = data && data[PERIOD_ID] ? data[PERIOD_ID] : this.#OptPeriod.MONTH_1;
        this.#dataSetId = data && data[DATA_SET_ID] ? data[DATA_SET_ID] : DEF.DEF_DATA_SET_ID;
    }

    #save() {
        const data = {
            [DATA_SET_ID]: this.#dataSetId,
            [PERIOD_ID]: this.#periodId,
        };
        self.localStorage.setItem(NS, JSON.stringify(data));
    }
}
