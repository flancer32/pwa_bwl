export default class Fl32_Bwl_Defaults {
    BACK_REALM = 'app';  // realm for API services ('/api/app/...') and CLI commands ('app-...')

    DATA_GROUP_ID_ADMIN = 1; // app's sample data
    DATA_GROUP_ID_CUST = 2;
    DATA_REF_CODE_OTHER = 'other';
    DATA_REF_CODE_ROOT = 'root';
    DATA_SESS_ID_ADMIN = 'sessIdForAdmin';
    DATA_SESS_ID_CUST = 'sessIdForCust';
    DATA_SHARING_MODE_ALL = 'a'; // all info is available for sharing in groups (user weight)
    DATA_SHARING_MODE_PERCENT = 'p'; // only relative info is available for sharing in groups (percentage)
    DATA_USER_ID_ADMIN = 1;
    DATA_USER_ID_CUST = 2;

    DI_CHART = 'appChart'; // DI container label for Chart library (https://www.chartjs.org/).
    DI_TOP_ACTIONS = 'appTopActions'; // DI container label for Top Actions widget

    /** @type {TeqFw_Core_App_Defaults} */
    MOD_CORE;
    /** @type {TeqFw_Http2_Defaults} */
    MOD_HTTP2;
    /** @type {TeqFw_Ui_Quasar_Defaults} */
    MOD_QUASAR;
    /** @type {Fl32_Teq_User_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Vue_Defaults} */
    MOD_VUE;

    // FRONTEND ROUTES
    REALM_PUB = 'pub';
    REALM_PUB_ROUTE_DEV_LOGIN = '/dev/login';
    REALM_PUB_ROUTE_FRIENDS = '/friends';
    REALM_PUB_ROUTE_HISTORY = '/history';
    REALM_PUB_ROUTE_HOME = '/';
    REALM_PUB_ROUTE_SETTINGS = '/settings';
    REALM_PUB_ROUTE_SIGN_IN = '/sign/in';
    REALM_SIGN = 'sign';
    REALM_SIGN_ROUTE_HOME = '/';
    REALM_SIGN_ROUTE_UP = '/up/:refCode?';

    // SERVICES ROUTES
    SERV_GROUP_LIST = '/group/list';
    SERV_PROFILE_GET = '/profile/get';
    SERV_SIGN_IN_CODE_SEND = '/sign/in/code/send';
    SERV_SIGN_UP = '/sign/up';
    SERV_WEIGHT_HISTORY_LIST = '/weight/history/list';
    SERV_WEIGHT_HISTORY_REMOVE = '/weight/history/remove';
    SERV_WEIGHT_STAT_SAVE = '/weight/stat/save';

    constructor(spec) {
        this.MOD_CORE = spec['TeqFw_Core_App_Defaults$']; // instance singleton
        this.MOD_QUASAR = spec['TeqFw_Ui_Quasar_Defaults$']; // instance singleton
        this.MOD_USER = spec['Fl32_Teq_User_Defaults$']; // instance singleton
        this.MOD_VUE = spec['TeqFw_Vue_Defaults$']; // instance singleton
        Object.freeze(this);
    }
}
