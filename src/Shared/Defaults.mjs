export default class Fl32_Bwl_Shared_Defaults {

    // FRONTEND ROUTES
    DOOR_PUB = 'pub';
    DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK = '/signIn/code/check/:code';
    DOOR_SIGN = 'sign';

    NAME = '@flancer32/pwa_bwl';

    // WEB SERVICES ROUTES
    WEB_FRIEND_LINK_ADD = '/friend/link/add';
    WEB_FRIEND_LINK_CODE_CREATE = '/friend/link/code/create';
    WEB_FRIEND_LIST = '/friend/list';
    WEB_PROFILE_GET = '/profile/get';
    WEB_SIGN_IN_CODE_CHECK = '/sign/in/code/check';
    WEB_SIGN_IN_CODE_SEND = '/sign/in/code/send';
    WEB_SIGN_UP = '/sign/up';
    WEB_WEIGHT_HISTORY_LIST = '/weight/history/list';
    WEB_WEIGHT_HISTORY_REMOVE = '/weight/history/remove';
    WEB_WEIGHT_STAT_SAVE = '/weight/stat/save';

    constructor(spec) {
        Object.freeze(this);
    }
}
