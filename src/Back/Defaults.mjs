/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Fl32_Bwl_Back_Defaults {

    CLI_PREFIX = 'app'; // prefix in CLI commands

    DATA_REF_CODE_OTHER = 'other';
    DATA_REF_CODE_ROOT = 'root';
    DATA_SESS_ID_ADMIN = 'sessIdForAdmin';
    DATA_SESS_ID_CUST = 'sessIdForCust';
    DATA_USER_ID_ADMIN = 1;
    DATA_USER_ID_CUST = 2;

    DOOR = {
        PUB: 'pub',
        SIGN: 'sign'
    }

    /** @type {Fl32_Teq_User_Back_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;
    /**
     * @deprecated use "MOD_" instead
     * @type {{WEB: TeqFw_Web_Back_Defaults, USER: Fl32_Teq_User_Back_Defaults}}
     */
    MOD = {
        /** @type {Fl32_Teq_User_Back_Defaults} */
        USER: null,
        /** @type {TeqFw_Web_Back_Defaults} */
        WEB: null
    }

    /** @type {Fl32_Bwl_Shared_Defaults} */
    SHARED = null;

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD.USER = spec['Fl32_Teq_User_Back_Defaults$'];
        this.MOD.WEB = spec['TeqFw_Web_Back_Defaults$'];
        this.SHARED = spec['Fl32_Bwl_Shared_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
