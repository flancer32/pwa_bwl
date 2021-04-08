/**
 * Request and response for 'Sign In Code Check' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check
 */

// MODULE'S CLASSES
class Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Request {
    /** @type {String} */
    code;
}

class Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Response {
    /** @type {String} */
    sessionId;
}

// MODULE'S EXPORT
export {
    Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Request as Request,
    Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Check_Response as Response,
};
