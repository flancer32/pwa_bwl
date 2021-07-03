/**
 * Root widget for 'Friends / Add' route.
 *
 * @namespace Fl32_Bwl_Front_Area_Pub_Route_Friends_Add
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Area_Pub_Route_Friends_Add';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Area_Pub_Route_Friends_Add
 * @returns {Fl32_Bwl_Front_Area_Pub_Route_Friends_Add.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Teq_User_Front_Model_Session} */
    const session = spec['Fl32_Teq_User_Front_Model_Session$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Factory} */
    const route = spec['Fl32_Bwl_Shared_Service_Route_Friend_Link_Add#Factory$'];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div v-show="!displayResult">{{$t('route.friends.add.wait')}}</div>
    <div v-show="displayResult">
        <div v-show="displaySuccess">{{$t('route.friends.add.success')}}</div>
        <div v-show="!displaySuccess">
            <div>{{$t('route.friends.add.error')}}</div>
            <div v-if="failureCause">{{failureCause}}</div>
        </div>
    </div>
</layout-centered>
`;

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Area_Pub_Route_Friends_Add
     */
    return {
        name: NS,
        template,
        data() {
            return {
                displayResult: false,
                displaySuccess: false,
                failureCause: null,
            };
        },
        props: {
            code: String,
        },
        async mounted() {
            if (await session.checkUserAuthenticated(this.$router)) {
                const req = route.createReq();
                req.code = this.code;
                // noinspection JSValidateTypes
                /** @type {Fl32_Bwl_Shared_Service_Route_Friend_Link_Add.Response} */
                const res = await gate.send(req, route);
                if (res) {
                    this.displayResult = true;
                    this.displaySuccess = res.success;
                    this.failureCause = res.failureCause;
                }
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
