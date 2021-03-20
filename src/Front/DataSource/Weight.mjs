/**
 * Data source for user's actual weights (current, target, start).
 *
 * @namespace Fl32_Bwl_Front_DataSource_Weight
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_DataSource_Weight';

// MODULE'S CLASSES
class Fl32_Bwl_Front_DataSource_Weight {
    #current = 0;
    #start = 0;
    #target = 0;

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton

        // DEFINE INNER FUNCTIONS

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        this.#current = 94.4;
        this.#start = 95.5;
        this.#target = 93.3;

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

    }

    async getCurrent() {
        return this.#current;
    }

}

// MODULE'S FUNCTIONS

// MODULE'S FUNCTIONALITY

// MODULE'S EXPORT
export default Fl32_Bwl_Front_DataSource_Weight;
