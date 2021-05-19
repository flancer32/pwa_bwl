/**
 * Class to integrate plugin into TeqFW application.
 * @extends TeqFw_Core_App_Plugin_Init_Base
 */
export default class Fl32_Bwl_Plugin_Init {

    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton

        this.getCommands = function () {
            return [
                'Fl32_Bwl_Back_Cli_Db_Reset$',
                'Fl32_Bwl_Back_Cli_Db_Upgrade$',
            ];
        };

        this.getServicesList = function () {
            return [
                'Fl32_Bwl_Back_Service_Friend_Link_Add$',
                'Fl32_Bwl_Back_Service_Friend_Link_Code_Create$',
                'Fl32_Bwl_Back_Service_Friend_List$',
                'Fl32_Bwl_Back_Service_Profile_Get$',
                'Fl32_Bwl_Back_Service_Sign_In_Code_Check$',
                'Fl32_Bwl_Back_Service_Sign_In_Code_Send$',
                'Fl32_Bwl_Back_Service_Sign_Up$',
                'Fl32_Bwl_Back_Service_Weight_History_List$',
                'Fl32_Bwl_Back_Service_Weight_History_Remove$',
                'Fl32_Bwl_Back_Service_Weight_Stat_Save$',
            ];
        };

        /**
         * Realm for plugin's services in the integrated API.
         *
         * @returns {String}
         */
        this.getServicesRealm = function () {
            return DEF.BACK_REALM;
        };
    }
}
