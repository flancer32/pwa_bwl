/**
 * Dialog widget to select new relation type: friend (already registered user) or new user in downline.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_Widget_Friends_Dialog_Add
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_Widget_Friends_Dialog_Add';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';
const TYPE_DOWN = 'downline';
const TYPE_FRIEND = 'friend';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_Widget_Friends_Dialog_Add
 * @returns {Fl32_Bwl_Front_Realm_Pub_Widget_Friends_Dialog_Add.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
    const i18next = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // named singleton destructuring

    // DEFINE WORKING VARS
    const template = `
<q-dialog :model-value="display" @hide="$emit('${EVT_HIDE}')">
    <q-card style="min-width: 350px">
        <q-card-section class="t-grid gutter-xs align-items-center">
                        
                <q-radio
                        :label="$t('wg.friends.dialog.add.downline')"
                        v-model="fldType"
                        val="${TYPE_DOWN}"
                ></q-radio>
                <q-radio
                        :label="$t('wg.friends.dialog.add.friend')"
                        v-model="fldType"
                        val="${TYPE_FRIEND}"
                ></q-radio>

        </q-card-section>

        <q-card-actions align="center" class="text-primary">
            <q-btn flat :label="$t('btn.cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('btn.ok')" v-close-popup v-on:click="submit"></q-btn>
        </q-card-actions>

    </q-card>
</q-dialog>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Pub_Widget_Friends_Dialog_Add
     */
    return {
        /* Misc: https://v3.vuejs.org/api/options-misc.html */
        name: NS,
        template,
        data() {
            return {
                fldType: TYPE_DOWN
            };
        },
        props: {
            display: Boolean, // control hide/display the widget from parent
        },
        methods: {
            /**
             * Pass selected values to the parent.
             */
            submit() {
                const isFriend = (this.fldType === TYPE_FRIEND);
                this.$emit(EVT_SUBMIT, isFriend);
            }
        },
        watch: {
            display(current) {

            },

        },
        emits: [EVT_HIDE, EVT_SUBMIT],
        mounted() {
            // debugger
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
