/**
 * Layout widget to center content.
 *
 * @namespace Fl32_Bwl_Front_Layout_Centered
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Layout_Centered';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Layout_Centered
 * @returns {Fl32_Bwl_Front_Layout_Centered.vueCompTmpl}
 */
export default function Factory() {
    // DEFINE WORKING VARS
    const template = `
<div class="layoutCentered">
    <div>
        <slot></slot>
    </div>
</div>
`;
    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Layout_Centered
     */
    return {
        name: NS,
        template,
    };
}

Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
