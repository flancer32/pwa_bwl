/**
 *  Meta data for '/app/profile' entity.
 *  @namespace Fl32_Bwl_Back_Store_RDb_Schema_Profile
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Store_RDb_Schema_Profile';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/app/profile';

/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Profile
 * @type {Object}
 */
const ATTR = {
    AGE: 'age',
    DATE_UPDATED: 'date_updated',
    HEIGHT: 'height',
    IS_FEMALE: 'is_female',
    USER_REF: 'user_ref',
};

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Profile
 */
class Dto {
    static name = `${NS}.Dto`;
    age;
    date_updated;
    height;
    is_female;
    user_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Profile {
    constructor(spec) {
        /** @type {Fl32_Teq_User_Back_Defaults} */
        const DEF = spec['Fl32_Teq_User_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Schema_EntityBase} */
        const base = spec['TeqFw_Db_Back_RDb_Schema_EntityBase$'];

        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.USER_REF],
            Dto
        );
    }
}

// finalize code components for this es6-module
Object.freeze(ATTR);
