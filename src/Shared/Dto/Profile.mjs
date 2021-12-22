/**
 * User profile DTO in Services API.
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Dto_Profile';

// MODULE'S CLASSES
class Fl32_Bwl_Shared_Dto_Profile {
    /** @type {number} */
    age;
    /** @type {Date} */
    dateUpdated;
    /** @type {number} */
    height;
    /** @type {boolean} */
    isFemale;
    /** @type {number} */
    userId;
    /** @type {number} */
    weightCurrent;
    /** @type {number} */
    weightTarget;
}

// static properties (compatible with Safari "< 14.1", "iOS < 14.5" form)
Fl32_Bwl_Shared_Dto_Profile.AGE = 'age';
Fl32_Bwl_Shared_Dto_Profile.DATE_UPDATED = 'dateUpdated';
Fl32_Bwl_Shared_Dto_Profile.HEIGHT = 'height';
Fl32_Bwl_Shared_Dto_Profile.IS_FEMALE = 'isFemale';
Fl32_Bwl_Shared_Dto_Profile.USER_ID = 'userId';
Fl32_Bwl_Shared_Dto_Profile.WEIGHT_CURRENT = 'weightCurrent';
Fl32_Bwl_Shared_Dto_Profile.WEIGHT_TARGET = 'weightTarget';

/**
 * Factory to create new DTO instances.
 * @memberOf Fl32_Bwl_Shared_Dto_Profile
 */
class Factory {
    constructor() {
        /**
         * @param {Fl32_Bwl_Shared_Dto_Profile|null} data
         * @return {Fl32_Bwl_Shared_Dto_Profile}
         */
        this.create = function (data = null) {
            const res = new Fl32_Bwl_Shared_Dto_Profile();
            res.age = data?.age;
            res.dateUpdated = data?.dateUpdated
                ? (data.dateUpdated instanceof Date) ? data.dateUpdated : new Date(data.dateUpdated)
                : null;
            res.height = data?.height;
            res.isFemale = data?.isFemale;
            res.userId = data?.userId;
            res.weightCurrent = data?.weightCurrent;
            res.weightTarget = data?.weightTarget;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Bwl_Shared_Dto_Profile);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    Fl32_Bwl_Shared_Dto_Profile as default,
    Factory
};
