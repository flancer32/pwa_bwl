/**
 * Data source for user's actual weights (current, target, start).
 */
// MODULE'S CLASSES
export default class Fl32_Bwl_Front_DataSource_Weight {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Front_Service_Gate} */
        const gate = spec['TeqFw_Web_Front_Service_Gate$'];
        /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Factory$'];

        // DEFINE WORKING VARS / PROPS
        /** @type {number} */
        let current;
        /** @type {number} */
        let target;

        // DEFINE INSTANCE METHODS

        this.loadFromServer = async function (forced = false) {
            if ((current === undefined) || forced) {
                // noinspection JSValidateTypes
                /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Response} */
                const res = await gate.send(route.createReq(), route);
                if (res && res.profile) {
                    current = res.profile.weightCurrent;
                    target = res.profile.weightTarget;
                }
            }
        }

        this.getCurrent = function () {
            return current;
        }

        this.getTarget = function () {
            return target;
        }
    }

}
