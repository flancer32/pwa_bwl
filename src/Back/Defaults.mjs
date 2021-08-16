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

    DESC_NODE = 'app'; // plugin's node in './cfg/local.json'


    /** @type {Fl32_Teq_User_Back_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Fl32_Bwl_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_USER = spec['Fl32_Teq_User_Back_Defaults$'];
        this.MOD_WEB = spec['TeqFw_Web_Back_Defaults$'];
        this.SHARED = spec['Fl32_Bwl_Shared_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
