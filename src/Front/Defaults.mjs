/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl32_Bwl_Front_Defaults {

    DI_CHART = 'appChart'; // DI container label for Chart library (https://www.chartjs.org/).
    DI_TOP_ACTIONS = 'appTopActions'; // DI container label for Top Actions widget

    /** @type {TeqFw_I18n_Front_Defaults} */
    MOD_I18N;
    /** @type {TeqFw_Ui_Quasar_Front_Defaults} */
    MOD_QUASAR;
    /** @type {TeqFw_Vue_Front_Defaults} */
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
    REALM_PUB_ROUTE_SIGN_IN_CODE_CHECK;
    REALM_PUB_ROUTE_SIGN_IN_CODE_GET = '/signIn/code/get';
    REALM_SIGN = 'sign';
    REALM_SIGN_ROUTE_HOME = '/';
    REALM_SIGN_ROUTE_UP = '/up/:refCode?';

    /** @type {Fl32_Bwl_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_I18N = spec['TeqFw_I18n_Front_Defaults$'];
        this.MOD_QUASAR = spec['TeqFw_Ui_Quasar_Front_Defaults$'];
        this.MOD_VUE = spec['TeqFw_Vue_Front_Defaults$'];
        this.SHARED = spec['Fl32_Bwl_Shared_Defaults$'];

        this.REALM_PUB = this.SHARED.REALM_PUB;
        this.REALM_PUB_ROUTE_SIGN_IN_CODE_CHECK = this.SHARED.REALM_PUB_ROUTE_SIGN_IN_CODE_CHECK;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
