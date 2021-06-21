/**
 * Data source for user's actual weights (current, target, start).
 */
// MODULE'S CLASSES
class Fl32_Bwl_Front_DataSource_Weight {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Function|Fl32_Bwl_Front_Gate_Profile_Get} */
        const gateProfile = spec['Fl32_Bwl_Front_Gate_Profile_Get$']; // function singleton
        /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Factory} */
        const fProfile = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Factory$']; // singleton

        // DEFINE WORKING VARS / PROPS
        /** @type {number} */
        let current;
        /** @type {number} */
        let start;
        /** @type {number} */
        let target;

        // DEFINE INSTANCE METHODS

        this.loadFromServer = async function (forced = false) {
            if ((current === undefined) || forced) {
                /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get.Response} */
                const res = await gateProfile(fProfile.createReq());
                if (res.profile) {
                    current = res.profile.weightCurrent;
                    start = res.profile.weightStart;
                    target = res.profile.weightTarget;
                }
            }
        }

        this.getCurrent = function () {
            return current;
        }

        this.getStart = function () {
            return start;
        }

        this.getTarget = function () {
            return target;
        }
    }

}

// MODULE'S EXPORT
export default Fl32_Bwl_Front_DataSource_Weight;
