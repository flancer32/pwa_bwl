/**
 * Class to integrate plugin into TeqFW application.
 * @extends TeqFw_Core_App_Plugin_Init_Base
 */
export default class Vendor_Project_Plugin_Init {

    constructor(spec) {
        /** @type {Vendor_Project_Defaults} */
        const DEF = spec['Vendor_Project_Defaults$'];    // instance singleton

        this.getCommands = function () {
            return [
                'Vendor_Project_Cli_Db_Reset$',
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
