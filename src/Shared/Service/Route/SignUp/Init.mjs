/**
 * Request and response for 'Save Sign Up Init Data' service.
 */
class Fl32_Bwl_Shared_Service_Route_SignUp_Init_Request {
    /** @type {Number} */
    age;
    /** @type {Number} */
    height;
    /** @type {Boolean} */
    isFemale;
    /** @type {Number} */
    weightInit;
    /** @type {Number} */
    weightTarget;
}

class Fl32_Bwl_Shared_Service_Route_SignUp_Init_Response {

}

export {
    Fl32_Bwl_Shared_Service_Route_SignUp_Init_Request as Request,
    Fl32_Bwl_Shared_Service_Route_SignUp_Init_Response as Response,
};
