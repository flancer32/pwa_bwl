/**
 * Request and response for 'Remove Weight Stats Data' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Weight_History_Remove
 */

// MODULE'S CLASSES
class Fl32_Bwl_Shared_Service_Route_Weight_History_Remove_Request {
    /** @type {Date} */
    date;
}

class Fl32_Bwl_Shared_Service_Route_Weight_History_Remove_Response {
    /**
     * Number of items been removed.
     * @type {Number}
     */
    removed = 0;
}

// MODULE'S EXPORT
export {
    Fl32_Bwl_Shared_Service_Route_Weight_History_Remove_Request as Request,
    Fl32_Bwl_Shared_Service_Route_Weight_History_Remove_Response as Response,
};
