/**
 * Request and response for 'Sign Up' service.
 *
 * @namespace Fl32_Bwl_Shared_Service_Route_Sign_Up
 */

// MODULE'S CLASSES
class Fl32_Bwl_Shared_Service_Route_Sign_Up_Request {
    /** @type {Number} */
    age;
    /** @type {String} */
    email;
    /** @type {Number} */
    height;
    /** @type {Boolean} */
    isFemale;
    /** @type {String} */
    name;
    /** @type {String} */
    phone;
    /** @type {String} */
    refCode;
    /** @type {Number} */
    weight;
}

class Fl32_Bwl_Shared_Service_Route_Sign_Up_Response {
    /** @type {String} */
    sessionId;
}

// MODULE'S EXPORT
export {
    Fl32_Bwl_Shared_Service_Route_Sign_Up_Request as Request,
    Fl32_Bwl_Shared_Service_Route_Sign_Up_Response as Response,
};
