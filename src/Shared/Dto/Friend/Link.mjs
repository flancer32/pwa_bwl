/**
 * Friend link DTO in Service API.
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Dto_Friend_Link';

// MODULE'S CLASSES
class Fl32_Bwl_Shared_Dto_Friend_Link {
    /** @type {string} */
    code
    /** @type {Date} */
    dateExpired
}

// attributes names to use in queries to RDb
Fl32_Bwl_Shared_Dto_Friend_Link.CODE = 'code';
Fl32_Bwl_Shared_Dto_Friend_Link.DATE_EXPIRED = 'dateExpired';

/**
 * Factory to create new DTO instances.
 * @memberOf Fl32_Bwl_Shared_Dto_Friend_Link
 */
class Factory {
    constructor() {
        /**
         * @param {Fl32_Bwl_Shared_Dto_Friend_Link|null} data
         * @return {Fl32_Bwl_Shared_Dto_Friend_Link}
         */
        this.create = function (data = null) {
            const res = new Fl32_Bwl_Shared_Dto_Friend_Link();
            res.code = data?.code;
            res.dateExpired = data?.dateExpired
                ? (data.dateExpired instanceof Date) ? data.dateExpired : new Date(data.dateExpired)
                : null;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Bwl_Shared_Dto_Friend_Link);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    Fl32_Bwl_Shared_Dto_Friend_Link as default,
    Factory
};
