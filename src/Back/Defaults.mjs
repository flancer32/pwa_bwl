/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Fl32_Bwl_Back_Defaults {

    MOD = {
        USER: null,
        WEB: null
    }

    /** @type {Fl32_Bwl_Shared_Defaults} */
    SHARED = null;

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Defaults} */
        this.SHARED = spec['Fl32_Bwl_Shared_Defaults$'];

        /** @type {Fl32_Teq_User_Back_Defaults} */
        this.MOD.USER = spec['Fl32_Teq_User_Back_Defaults$'];
        /** @type {TeqFw_Web_Back_Defaults} */
        this.MOD.WEB = spec['TeqFw_Web_Back_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
