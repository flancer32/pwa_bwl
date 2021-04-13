/**
 * Request and response for 'List Weight Stats Data' service.
 */
class Fl32_Bwl_Shared_Service_Route_Weight_History_List_Request {
    /** @type {Date} */
    dateFrom;
    /** @type {Date} */
    dateTo;
    /** @type {String} 'asc' or 'desc'*/
    order;
}

class Fl32_Bwl_Shared_Service_Route_Weight_History_List_Response {
    /** @type {Fl32_Bwl_Shared_Service_Data_Weight_History_Item[]} */
    items;
}

export {
    Fl32_Bwl_Shared_Service_Route_Weight_History_List_Request as Request,
    Fl32_Bwl_Shared_Service_Route_Weight_History_List_Response as Response,
};
