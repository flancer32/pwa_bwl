export default class Fl32_Bwl_Defaults {
    BACK_REALM = 'app';  // realm for API services ('/api/app/...') and CLI commands ('app-...')
    DATA_REF_CODE_ROOT = 'root';
    DATA_USER_ID_ADMIN = 1; // app's sample data
    DATA_USER_ID_CUST = 2;

    ROUTE_HOME = '/'; // frontend routes
    ROUTE_SIGN_IN = '/sign/in';
    ROUTE_SIGN_UP = '/sign/up/:refCode?';

    /** @type {TeqFw_Core_App_Defaults} */
    MOD_CORE;
    /** @type {Fl32_Teq_User_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Vue_Defaults} */
    MOD_VUE;

    constructor(spec) {
        this.MOD_CORE = spec['TeqFw_Core_App_Defaults$']; // instance singleton
        this.MOD_USER = spec['Fl32_Teq_User_Defaults$']; // instance singleton
        this.MOD_VUE = spec['TeqFw_Vue_Defaults$']; // instance singleton
        Object.freeze(this);
    }
}
