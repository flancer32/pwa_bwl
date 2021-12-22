/**
 * Weight history item DTO in Services API.
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Dto_Weight_History_Item';

// MODULE'S CLASSES
class Fl32_Bwl_Shared_Dto_Weight_History_Item {
    /** @type {string} date as 'YYYY/MM/DD' */
    date;
    /** @type {string} float number as string '75.5' */
    weight;
}

// attributes names to use in queries to RDb
Fl32_Bwl_Shared_Dto_Weight_History_Item.DATE = 'date';
Fl32_Bwl_Shared_Dto_Weight_History_Item.WEIGHT = 'weight';

/**
 * Factory to create new DTO instances.
 * @memberOf Fl32_Bwl_Shared_Dto_Weight_History_Item
 */
class Factory {
    constructor() {
        /**
         * @param {Fl32_Bwl_Shared_Dto_Weight_History_Item|null} data
         * @return {Fl32_Bwl_Shared_Dto_Weight_History_Item}
         */
        this.create = function (data = null) {
            const res = new Fl32_Bwl_Shared_Dto_Weight_History_Item();
            res.date = data?.date
                ? (data.date instanceof Date) ? data.date : new Date(data.date)
                : null;
            res.weight = data?.weight;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Bwl_Shared_Dto_Weight_History_Item);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    Fl32_Bwl_Shared_Dto_Weight_History_Item as default,
    Factory
};
