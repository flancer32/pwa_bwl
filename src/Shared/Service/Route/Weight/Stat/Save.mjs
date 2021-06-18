/**
 * Request and response for 'Save Weight Stats Data' service.
 */
class Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request {
    /** @type {Date} */
    date;
    /** @type {Number} */
    weight;
    /** @type {String} @see Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types */
    type;
}

class Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Response {

}

class Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types {}

// static properties (compatible with Safari "< 14.1", "iOS < 14.5" form)
Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types.CURRENT = 'current';
Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types.START = 'start';
Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types.TARGET = 'target';


export {
    Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request as Request,
    Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Response as Response,
    Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Types as Types,
};
