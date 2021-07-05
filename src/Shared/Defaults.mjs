export default class Fl32_Bwl_Shared_Defaults {
    NAME = '@flancer32/pwa_bwl';

    BACK_REALM = 'app';  // realm for API services ('/api/app/...') and CLI commands ('app-...')

    DATA_REF_CODE_OTHER = 'other';
    DATA_REF_CODE_ROOT = 'root';
    DATA_SESS_ID_ADMIN = 'sessIdForAdmin';
    DATA_SESS_ID_CUST = 'sessIdForCust';
    DATA_USER_ID_ADMIN = 1;
    DATA_USER_ID_CUST = 2;

    DI_CHART = 'appChart'; // DI container label for Chart library (https://www.chartjs.org/).
    DI_TOP_ACTIONS = 'appTopActions'; // DI container label for Top Actions widget

    /** @type {TeqFw_Http2_Back_Defaults} */
    MOD_HTTP2;
    /** @type {TeqFw_I18n_Defaults} */
    MOD_I18N;
    /** @type {TeqFw_Ui_Quasar_Defaults} */
    MOD_QUASAR;
    /** @type {Fl32_Teq_User_Back_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Vue_Defaults} */
    MOD_VUE;

    // FRONTEND ROUTES
    // TODO: rename REALM to DOOR
    REALM_PUB = 'pub';
    REALM_PUB_ROUTE_DEV_LOGIN = '/dev/login';
    REALM_PUB_ROUTE_FRIENDS = '/friends';
    REALM_PUB_ROUTE_FRIENDS_ADD = '/friends/add/:code';
    REALM_PUB_ROUTE_HISTORY = '/history';
    REALM_PUB_ROUTE_HOME = '/';
    REALM_PUB_ROUTE_SETTINGS = '/settings';
    REALM_PUB_ROUTE_SIGN_IN_CODE_CHECK = '/signIn/code/check/:code';
    REALM_PUB_ROUTE_SIGN_IN_CODE_GET = '/signIn/code/get';
    REALM_SIGN = 'sign';
    REALM_SIGN_ROUTE_HOME = '/';
    REALM_SIGN_ROUTE_UP = '/up/:refCode?';

    // SERVICES ROUTES
    SRV = {
        FRIEND: {
            LINK: {
                ADD: '/friend/link/add',
                CODE:
                    {CREATE: '/friend/link/code/create'}
            },
            LIST: '/friend/list'
        },
        PROFILE: {GET: '/profile/get'},
        SIGN: {
            IN: {
                CODE: {
                    CHECK: '/sign/in/code/check',
                    SEND: '/sign/in/code/send'
                }
            },
            UP: '/sign/up'
        },
        WEIGHT: {
            HISTORY: {
                LIST: '/weight/history/list',
                REMOVE: '/weight/history/remove'
            },
            STAT: {
                SAVE: '/weight/stat/save'
            }
        }
    };


    SERV_WEIGHT_HISTORY_LIST = '/weight/history/list';
    SERV_WEIGHT_HISTORY_REMOVE = '/weight/history/remove';
    SERV_WEIGHT_STAT_SAVE = '/weight/stat/save';

    constructor(spec) {
        this.MOD_HTTP2 = spec['TeqFw_Http2_Back_Defaults$']; // singleton
        this.MOD_I18N = spec['TeqFw_I18n_Defaults$']; // singleton
        this.MOD_QUASAR = spec['TeqFw_Ui_Quasar_Defaults$']; // singleton
        this.MOD_USER = spec['Fl32_Teq_User_Back_Defaults$']; // singleton
        this.MOD_VUE = spec['TeqFw_Vue_Defaults$']; // singleton
        Object.freeze(this);
    }
}
