/**
 * Weight history item in services API.
 */
class Fl32_Bwl_Shared_Service_Data_Weight_History_Item {
    /** @type {String} date as 'YYYY/MM/DD' */
    date;
    /** @type {String} float number as string '75.5' */
    weight;
}

// static properties (compatible with Safari "< 14.1", "iOS < 14.5" form)
Fl32_Bwl_Shared_Service_Data_Weight_History_Item.A_DATE = 'date';
Fl32_Bwl_Shared_Service_Data_Weight_History_Item.A_WEIGHT = 'weight';

Object.freeze(Fl32_Bwl_Shared_Service_Data_Weight_History_Item);

export default Fl32_Bwl_Shared_Service_Data_Weight_History_Item;
