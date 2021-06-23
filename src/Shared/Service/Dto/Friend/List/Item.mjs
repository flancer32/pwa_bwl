/**
 * Friends list item DTO in Service API.
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Shared_Service_Dto_Friend_List_Item';

// MODULE'S CLASSES
class Fl32_Bwl_Shared_Service_Dto_Friend_List_Item {
    /** @type {Date} */
    dateStarted;
    /** @type {number} */
    friendId;
    /** @type {string} */
    friendName;
}

// attributes names to use in queries to RDb
Fl32_Bwl_Shared_Service_Dto_Friend_List_Item.DATE_STARTED = 'dateStarted';
Fl32_Bwl_Shared_Service_Dto_Friend_List_Item.FRIEND_ID = 'friendId';
Fl32_Bwl_Shared_Service_Dto_Friend_List_Item.FRIEND_NAME = 'friendName';

/**
 * Factory to create new DTO instances.
 * @memberOf Fl32_Bwl_Shared_Service_Dto_Friend_List_Item
 */
class Factory {
    constructor() {
        /**
         * @param {Fl32_Bwl_Shared_Service_Dto_Friend_List_Item|null} data
         * @return {Fl32_Bwl_Shared_Service_Dto_Friend_List_Item}
         */
        this.create = function (data = null) {
            const res = new Fl32_Bwl_Shared_Service_Dto_Friend_List_Item();
            res.dateStarted = data?.dateStarted
                ? (data.dateStarted instanceof Date) ? data.dateStarted : new Date(data.dateStarted)
                : null;
            res.friendId = data?.friendId;
            res.friendName = data?.friendName;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Bwl_Shared_Service_Dto_Friend_List_Item);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    Fl32_Bwl_Shared_Service_Dto_Friend_List_Item as default,
    Factory
};
