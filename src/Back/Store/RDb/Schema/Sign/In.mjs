/**
 *  Meta data for '/app/sign/in' entity.
 *  @namespace Fl32_Bwl_Back_Store_RDb_Schema_Sign_In
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Store_RDb_Schema_Sign_In';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/app/sign/in';

/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Sign_In
 * @type {Object}
 */
const ATTR = {
    CODE: 'code',
    DATE_EXPIRED: 'date_expired',
    USER_REF: 'user_ref'
};

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Bwl_Back_Store_RDb_Schema_Sign_In
 */
class Dto {
    static name = `${NS}.Dto`;
    code;
    date_expired;
    user_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Sign_In {
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
