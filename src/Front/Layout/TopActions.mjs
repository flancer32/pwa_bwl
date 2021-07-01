/**
 * Layout widget for context related actions.
 * This widget is placed into DI container as 'Fl32_Bwl_Shared_Defaults.DI_TOP_ACTIONS'.
 *
 * @namespace Fl32_Bwl_Front_Layout_TopActions
 */

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Front_Layout_TopActions';

const template = `
<template v-for="one in actions">
    <q-btn dense flat :icon="one.icon" v-on:click="one.action"></q-btn>
</template>
`;

/**
 * Action data structure.
 * @memberOf Fl32_Bwl_Front_Layout_TopActions
 */
class Item {
    /** @type {Function} on click action */
    action;
    /** @type {String} icon name */
    icon;
}

/**
 * TODO: try to describe Vue component instance with JSDoc interface (optional??? this component is stored in DI container).
 * @interface
 * @memberOf Fl32_Bwl_Front_Layout_TopActions
 */
// eslint-disable-next-line no-unused-vars
const IComponent = {
    /**
     * @param {Array.<Item>} actions
     */
    // eslint-disable-next-line no-unused-vars
    setActions(actions) { }
};

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Layout_TopActions
 * @returns {Fl32_Bwl_Front_Layout_TopActions.IComponent}
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Shared_Defaults} */
    const DEF = spec['Fl32_Bwl_Shared_Defaults$'];
    /** @type {TeqFw_Di_Container} */
    const container = spec['TeqFw_Di_Container$']; // singleton

    /**
     * Class for template to create new instances.
     *
     * @memberOf Fl32_Bwl_Front_Layout_TopActions
     * @implements Fl32_Bwl_Front_Layout_TopActions.IComponent
     */
    class VueTemplate {
        name = 'TopActions';
        template = template;
        methods = {
            setActions(actions) {
                this.actions = actions;
            }
        };

        data() {
            return {
                actions: Array,
            };
        }

        created() {
            // place this instance to DI container
            container.set(DEF.DI_TOP_ACTIONS, this);
        }
    }

    return new VueTemplate();
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

// MODULE'S EXPORT
export {
    Factory as default,
    Item as Item
};
