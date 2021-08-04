/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl32_Bwl_Front_Defaults {

    DEF_DATA_SET_ID = 0;

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

    /** @type {Fl32_Bwl_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // EXTRACT DEPS
        this.SHARED = spec['Fl32_Bwl_Shared_Defaults$'];

        this.DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK = this.SHARED.DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
