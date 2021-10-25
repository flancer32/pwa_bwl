/**
 *  Meta data for '/app/friend/link' entity.
 *  @namespace Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/app/friend/link';

/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link
 * @type {Object}
 */
const ATTR = {
    CODE: 'code',
    DATE_EXPIRED: 'date_expired',
    LEADER_REF: 'leader_ref'
};

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link
 */
class Dto {
    static name = `${NS}.Dto`;
    /** @type {string} */
    code;
    /** @type {Date} */
    date_expired;
    /**
     * The user who has started the relationship.
     * @type {number}
     */
    leader_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link {
    constructor(spec) {
        /** @type {Fl32_Teq_User_Back_Defaults} */
        const DEF = spec['Fl32_Teq_User_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Schema_EntityBase} */
        const base = spec['TeqFw_Db_Back_RDb_Schema_EntityBase$'];

        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.CODE],
            Dto
        );
    }
}

// finalize code components for this es6-module
Object.freeze(ATTR);
