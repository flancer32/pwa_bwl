/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl32_Bwl_Front_Defaults {

    DI_CHART = 'appChart'; // DI container label for Chart library (https://www.chartjs.org/).
    DI_TOP_ACTIONS = 'appTopActions'; // DI container label for Top Actions widget

    // FRONTEND ROUTES
    DOOR_PUB_ROUTE_DEV_LOGIN = '/dev/login';
    DOOR_PUB_ROUTE_FRIENDS = '/friends';
    DOOR_PUB_ROUTE_FRIENDS_ADD = '/friends/add/:code';
    DOOR_PUB_ROUTE_HISTORY = '/history';
    DOOR_PUB_ROUTE_HOME = '/';
    DOOR_PUB_ROUTE_SETTINGS = '/settings';
    DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK;
    DOOR_PUB_ROUTE_SIGN_IN_CODE_GET = '/signIn/code/get';
    DOOR_SIGN_ROUTE_HOME = '/';
    DOOR_SIGN_ROUTE_UP = '/up/:refCode?';

    /** @type {TeqFw_I18n_Front_Defaults} */
    MOD_I18N;
    /** @type {TeqFw_Ui_Quasar_Front_Defaults} */
    MOD_QUASAR;
    /** @type {TeqFw_Vue_Front_Defaults} */
    MOD_VUE;

    /** @type {Fl32_Bwl_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_I18N = spec['TeqFw_I18n_Front_Defaults$'];
        this.MOD_QUASAR = spec['TeqFw_Ui_Quasar_Front_Defaults$'];
        this.MOD_VUE = spec['TeqFw_Vue_Front_Defaults$'];
        this.SHARED = spec['Fl32_Bwl_Shared_Defaults$'];

        this.DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK = this.SHARED.DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
