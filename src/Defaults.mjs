export default class Vendor_Project_Defaults {
    BACK_REALM = 'app';  // realm for API services ('/api/app/...') and CLI commands ('app-...')
    DATA_USER_ID_ADMIN = 1; // app's sample data
    DATA_USER_ID_CUST = 2;


    /** @type {TeqFw_Core_App_Defaults} */
    MOD_CORE;
    /** @type {Fl32_Teq_User_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Vue_Defaults} */
    MOD_VUE;

    constructor(spec) {
        this.MOD_CORE = spec['TeqFw_Core_App_Defaults$'];    // instance singleton
        this.MOD_USER = spec['Fl32_Teq_User_Defaults$'];    // instance singleton
        this.MOD_VUE = spec['TeqFw_Vue_Defaults$'];    // instance singleton
        Object.freeze(this);
    }
}
