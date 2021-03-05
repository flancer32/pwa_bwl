export default class Fl32_Bwl_Defaults {
    BACK_REALM = 'app';  // realm for API services ('/api/app/...') and CLI commands ('app-...')

    DATA_GROUP_ID_ADMIN = 1; // app's sample data
    DATA_GROUP_ID_CUST = 2;
    DATA_REF_CODE_OTHER = 'other';
    DATA_REF_CODE_ROOT = 'root';
    DATA_SHARING_MODE_ALL = 'a'; // all info is available for sharing in groups (user weight)
    DATA_SHARING_MODE_PERCENT = 'p'; // only relative info is available for sharing in groups (percentage)
    DATA_USER_ID_ADMIN = 1;
    DATA_USER_ID_CUST = 2;

    ROUTE_GROUPS = '/groups'; // frontend routes
    ROUTE_HISTORY = '/history';
    ROUTE_HOME = '/';
    ROUTE_SETTINGS = '/settings';
    ROUTE_SIGN_IN = '/sign/in';
    ROUTE_SIGN_UP = '/sign/up/:refCode?';
    ROUTE_SIGN_UP_INIT = '/sign/up/init';

    SERV_GROUP_LIST = '/group/list';
    SERV_SIGN_UP_INIT = '/signUp/init';
    SERV_WEIGHT_HISTORY_LIST = '/weight/history/list';
    SERV_WEIGHT_STAT_SAVE = '/weight/stat/save';

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
