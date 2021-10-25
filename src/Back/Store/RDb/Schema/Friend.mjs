/**
 *  Meta data for '/app/friend' entity.
 *  @namespace Fl32_Bwl_Back_Store_RDb_Schema_Friend
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Store_RDb_Schema_Friend';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/app/friend';

/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Friend
 * @type {Object}
 */
const ATTR = {
    DATE_STARTED: 'date_started',
    LEADER_REF: 'leader_ref',
    WINGMAN_REF: 'wingman_ref',
};

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Friend
 */
class Dto {
    static name = `${NS}.Dto`;
    /** @type {Date} */
    date_started;
    /**
     * The user who has started the relationship.
     * @type {number}
     */
    leader_ref;
    /**
     * The user who has accepted the relationship.
     * @type {number}
     */
    wingman_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Friend {
    constructor(spec) {
        /** @type {Fl32_Teq_User_Back_Defaults} */
        const DEF = spec['Fl32_Teq_User_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Schema_EntityBase} */
        const base = spec['TeqFw_Db_Back_RDb_Schema_EntityBase$'];

        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.LEADER_REF, ATTR.WINGMAN_REF],
            Dto
        );
    }
}

// finalize code components for this es6-module
Object.freeze(ATTR);
