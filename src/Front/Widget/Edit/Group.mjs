/**
 * Widget to edit data in Groups route.
 *
 * @namespace Fl32_Bwl_Front_Widget_Edit_Group
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Widget_Edit_Group';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

const template = `
<q-dialog :model-value="display" @hide="$emit('${EVT_HIDE}');">
    <q-card style="min-width: 350px">
        <q-card-section class="t-grid gutter-xs align-items-center"
                        style="grid-template-columns: auto auto; justify-items: left;">
            <div class="text-h7 text-right">{{$t('wg.editGroup.name')}}</div>
            <q-input
                    dense
                    outlined
                    v-model="groupName"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg.editGroup.owner')}}</div>
            <q-input
                    dense
                    outlined
                    readonly
                    v-model="owner"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg.editGroup.dateCreated')}}</div>
            <q-input
                    dense
                    outlined
                    readonly
                    v-model="dateFormatted"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg.editGroup.mode')}}</div>
            <q-input
                    dense
                    outlined
                    readonly
                    v-model="mode"
            ></q-input>
            <div class="text-h7 text-right">{{$t('wg.editGroup.active')}}</div>
            <q-toggle
                    v-model="active"
            ></q-toggle>
            <div class="text-h7 text-right">{{$t('wg.editGroup.members')}}</div>
            <div>
                <template v-for="one in members">
                    <q-chip color="blue" :label="one.name"></q-chip>
                </template>
            </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('wg:editWeight.cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('wg:editWeight.ok')" v-close-popup v-on:click="submit"></q-btn>
        </q-card-actions>
    </q-card>
</q-dialog>    
`;

// MODULE'S CLASSES
/**
 * Data object for group member (internal for this ES6 module).
 * @memberOf Fl32_Bwl_Front_Widget_Edit_Group
 */
class DMember {
    userId;
    name;
}

// DEFINE MODULE'S FUNCTIONS
/**
 * @memberOf Fl32_Bwl_Front_Widget_Edit_Group
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {TeqFw_I18n_Front_Lib} */
    const i18n = spec['TeqFw_I18n_Front_Lib$'];
    const {formatDate: dateForUi} = spec['Fl32_Bwl_Shared_Util'];

    /**
     * Template to create new instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Widget_Edit_Group
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data: function () {
            return {
                active: Boolean,
                dateCreated: Date,
                groupName: String,
                members: Array,
                mode: String,
                owner: String,
            };
        },
        props: {
            /** @type {Fl32_Bwl_Shared_Dto_Group_Item} */
            modelValue: null,
            display: Boolean, // control hide/display the widget from parent
        },
        computed: {
            dateFormatted() {
                return dateForUi(i18n.getLang(), this.dateCreated);
            },
        },
        methods: {
            resetData() {
                /** @type {Fl32_Bwl_Shared_Dto_Group_Item} */
                const model = this.modelValue;
                if (model) {
                    this.active = model.active;
                    this.dateCreated = model.date;
                    this.groupName = model.groupName;
                    this.mode = model.mode;
                    this.owner = model.adminName;
                    // members
                    this.members = [];
                    for (const userId of Object.keys(model.members)) {
                        const item = new DMember();
                        item.userId = userId;
                        item.name = model.members[userId];
                        this.members.push(item);
                    }
                }
            },
            /**
             * Pass selected values to the parent.
             */
            submit() {
                this.$emit(EVT_SUBMIT, this.groupName, this.owner);
            }
        },
        watch: {
            display(current) {
                // reset internal vars to parent values
                if (current) this.resetData();
            },

        },
        emits: [EVT_HIDE, EVT_SUBMIT],
        mounted() {
            this.resetData();
        },
    };
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
