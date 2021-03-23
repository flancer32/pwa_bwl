/**
 * Group list item in services API.
 */
class Fl32_Bwl_Shared_Service_Data_Group_Item {
    static A_ACTIVE = 'active';
    static A_ADMIN_ID = 'adminId';
    static A_ADMIN_NAME = 'adminName';
    static A_DATE = 'date';
    static A_GROUP_ID = 'groupId';
    static A_GROUP_NAME = 'groupName';
    static A_MODE = 'mode';

    /** @type {Boolean} 'true' if user has activated his membership in the group  */
    active;
    /** @type {Number} */
    adminId;
    /** @type {String} */
    adminName;
    /** @type {String} date joined as 'YYYY/MM/DD' */
    date;
    /** @type {Number} */
    groupId;
    /** @type {String} */
    groupName;
    /** @type {Object.<Number, String>} */
    members;
    /** @type {String} see DEF.DATA_SHARING_MODE_... */
    mode;
}

Object.freeze(Fl32_Bwl_Shared_Service_Data_Group_Item);

export default Fl32_Bwl_Shared_Service_Data_Group_Item;
