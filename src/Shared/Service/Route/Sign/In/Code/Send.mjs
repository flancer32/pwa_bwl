/**
 * Request and response for 'Email Sign In Code' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send
 */

// MODULE'S CLASSES
class Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Request {
    /** @type {String} */
    email;
}

class Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Response {
    /** @type {Boolean} */
    isSent;
}

// MODULE'S EXPORT
export {
    Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Request as Request,
    Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send_Response as Response,
};
