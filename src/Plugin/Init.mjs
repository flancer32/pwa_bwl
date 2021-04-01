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
                'Fl32_Bwl_Cli_Db_Upgrade$',
            ];
        };

        this.getI18nResources = function () {
            return {
                [DEF.MOD_CORE.I18N_FRONT]: [
                    './i18n/front.en.json',
                    './i18n/front.ru.json'
                ],
            };
        };

        this.getServicesList = function () {
            return [
                'Fl32_Bwl_Back_Service_Group_List$',
                'Fl32_Bwl_Back_Service_Profile_Get$',
                'Fl32_Bwl_Back_Service_Sign_Up$',
                'Fl32_Bwl_Back_Service_SignUp_Init$',
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
