/**
 *  Meta data for '/app/weight/stat' entity.
 *  @namespace Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/app/weight/stat';

/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat
 * @type {Object}
 */
const ATTR = {
    DATE: 'date',
    TYPE: 'type',
    USER_REF: 'user_ref',
    VALUE: 'value',
};

/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat
 * @type {Object}
 */
const STAT_TYPE = {
    CURRENT: 'c',
    TARGET: 't',
};

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat
 */
class Dto {
    static name = `${NS}.Dto`;
    date;
    type;
    user_ref;
    value;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat {
    constructor(spec) {
        /** @type {Fl32_Teq_User_Back_Defaults} */
        const DEF = spec['Fl32_Teq_User_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Schema_EntityBase} */
        const base = spec['TeqFw_Db_Back_RDb_Schema_EntityBase$'];

        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.USER_REF, ATTR.DATE, ATTR.TYPE],
            Dto
        );
    }
}

// finalize code components for this es6-module
Object.freeze(ATTR);
Object.freeze(STAT_TYPE);
export {STAT_TYPE};
