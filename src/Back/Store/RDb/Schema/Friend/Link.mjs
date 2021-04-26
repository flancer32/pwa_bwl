/**
 *  One-time links to setup friendship relations between users..
 */
class Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link {
    /** @type {String} */
    code;
    /** @type {Date} */
    date_expired;
    /**
     * The user who has started the relationship.
     * @type {Number}
     */
    leader_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link.A_CODE = 'code';
Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link.A_DATE_EXPIRED = 'date_expired';
Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link.A_LEADER_REF = 'leader_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link.ENTITY = 'app_friend_link';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link);

// MODULE'S EXPORT
export default Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link;
