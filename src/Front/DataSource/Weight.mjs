/**
 * Data source for user's actual weights (current, target, start).
 *
 * @namespace Fl32_Bwl_Front_DataSource_Weight
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_DataSource_Weight';

// MODULE'S CLASSES
class Fl32_Bwl_Front_DataSource_Weight {
    /** @type {Number} */
    #current;
    /** @type {Fl32_Bwl_Front_Gate_Profile_Get.gate} */
    #gateProfile;
    /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get_Request} */
    #ReqProfile;
    /** @type {Number} */
    #start;
    /** @type {Number} */
    #target;

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        this.#gateProfile = spec['Fl32_Bwl_Front_Gate_Profile_Get$']; // function singleton
        this.#ReqProfile = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Request']; // class constructor
    }

    async loadFromServer(forced = false) {
        if ((this.#current === undefined) || forced) {
            /** @type {Fl32_Bwl_Shared_Service_Route_Profile_Get_Response} */
            const res = await this.#gateProfile(new this.#ReqProfile());
            if (res.profile) {
                this.#current = res.profile.weightCurrent;
                this.#start = res.profile.weightStart;
                this.#target = res.profile.weightTarget;
            }
        }
    }

    async getCurrent() {
        await this.loadFromServer();
        return this.#current;
    }

    async getStart() {
        await this.loadFromServer();
        return this.#start;
    }

    async getTarget() {
        await this.loadFromServer();
        return this.#target;
    }

}

// MODULE'S FUNCTIONS

// MODULE'S FUNCTIONALITY

// MODULE'S EXPORT
export default Fl32_Bwl_Front_DataSource_Weight;
