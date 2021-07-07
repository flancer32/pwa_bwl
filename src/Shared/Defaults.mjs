export default class Fl32_Bwl_Shared_Defaults {
    NAME = '@flancer32/pwa_bwl';

    // FRONTEND ROUTES
    // TODO: rename REALM to DOOR
    REALM_PUB = 'pub';
    REALM_PUB_ROUTE_SIGN_IN_CODE_CHECK = '/signIn/code/check/:code';

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
        Object.freeze(this);
    }
}
