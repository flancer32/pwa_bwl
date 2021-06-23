/**
 * Home route for '/sign' realm.
 *
 * @namespace Fl32_Bwl_Front_Area_Sign_Route_Home
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Area_Sign_Route_Home';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Area_Sign_Route_Home
 * @returns {Fl32_Bwl_Front_Area_Sign_Route_Home.vueCompTmpl}
 */
function Factory() {
    const template = `
<div class="t-grid app-home">
    <span>SIGN REALM HOME</span>
</div>
`;

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Area_Sign_Route_Home
     */
    return {
        name: NS,
        template,
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
