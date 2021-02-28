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
                'Fl32_Bwl_Cli_Db_Reset$',
            ];
        };

        this.getServicesList = function () {
            return [
                'Fl32_Bwl_Back_Service_SignUp_Init$',
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
