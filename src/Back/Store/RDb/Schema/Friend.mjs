/**
 *  Friendships registry.
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Friend {
    /** @type {Date} */
    date_started;
    /**
     * The user who has started the relationship.
     * @type {Number}
     */
    leader_ref;
    /**
     * The user who has accepted the relationship.
     * @type {Number}
     */
    wingman_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Back_Store_RDb_Schema_Friend.A_DATE_STARTED = 'date_started';
Fl32_Bwl_Back_Store_RDb_Schema_Friend.A_LEADER_REF = 'leader_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Friend.A_WINGMAN_REF = 'wingman_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Friend.ENTITY = 'app_friend';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Back_Store_RDb_Schema_Friend);
