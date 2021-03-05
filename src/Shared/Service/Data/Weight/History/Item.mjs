/**
 * Weight history item in services API.
 */
class Fl32_Bwl_Shared_Service_Data_Weight_History_Item {
    static A_DATE = 'date';
    static A_WEIGHT = 'weight';

    /** @type {String} date as 'YYYY/MM/DD' */
    date;
    /** @type {String} float number as string '75.5' */
    weight;
}

Object.freeze(Fl32_Bwl_Shared_Service_Data_Weight_History_Item);

export default Fl32_Bwl_Shared_Service_Data_Weight_History_Item;
