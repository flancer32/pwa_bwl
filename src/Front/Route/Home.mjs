const template = `
<div class="t-grid app-home">
    <div class="app-home-stats">
        <q-input
                :label="$t('home.start')"
                dense
                outlined
                readonly
                stack-label
                v-model="start"
                v-on:click="editWeightStart"
        ></q-input>
        <q-input
                :label="$t('home.current')"
                dense
                outlined stack-label
                readonly
                v-model="current"
                v-on:click="editWeightCurrent"
        ></q-input>
        <q-input
                :label="$t('home.target')"
                dense
                outlined
                readonly
                stack-label
                v-model="target"
                v-on:click="editWeightTarget"
        ></q-input>
    </div>
    <chart :key="chartRedraw"></chart>
    <div class="t-grid app-home-controls">
        <div style="width: 100%">
            <q-select
                    :label="$t('home.group')"
                    :options="options"
                    dense
                    options-dense
                    stack-label
                    v-model="mode"
            ></q-select>
        </div>
        <div>
            <edit-weight
                    :display="dialogDisplay"
                    :weight="weightEdit"
                    :type="weightType"
                    @onHide="dialogDisplay=false"
                    @onSubmit="editWeightSubmit"
            ></edit-weight>
        </div>
    </div>
</div>
`;

export default function Fl32_Bwl_Front_Route_Home(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    /** @type {Fl32_Bwl_Front_Widget_Chart} */
    const chart = spec['Fl32_Bwl_Front_Widget_Chart$'];
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.IComponent} */
    const topActions = spec[DEF.DI_TOP_ACTIONS]; // Vue component singleton
    /** @type {typeof Fl32_Bwl_Front_Layout_TopActions.Item} */
    const Action = spec['Fl32_Bwl_Front_Layout_TopActions#Item']; // class constructor
    /** @type {Fl32_Bwl_Front_Widget_Edit_Weight.widget} */
    const editWeight = spec['Fl32_Bwl_Front_Widget_Edit_Weight$'];
    /** @type {Fl32_Bwl_Front_DataSource_Weight} */
    const dsWeights = spec['Fl32_Bwl_Front_DataSource_Weight$']; // instance singleton
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    return {
        name: 'RouteHome',
        template,
        components: {chart, editWeight},
        data: function () {
            return {
                chartRedraw: 0,
                current: null,
                dialogDisplay: false,
                mode: 'Personal',
                options: ['Personal'],
                start: null,
                target: null,
                weightEdit: null,
                weightType: editWeight.TYPES.CURRENT,
            };
        },
        computed: {
            ...mapState({
                stateTitle: state => state.title,
                stateUserAuthenticated: state => state.user.authenticated,
            })
        },
        methods: {
            editWeightCurrent() {
                this.dialogDisplay = true;
                this.weightType = editWeight.TYPES.CURRENT;
                this.weightEdit = this.current;
            },
            editWeightStart() {
                this.dialogDisplay = true;
                this.weightType = editWeight.TYPES.START;
                this.weightEdit = this.start;
            },
            async editWeightSubmit() {
                await this.setWeights(true);
                this.chartRedraw++;
            },
            editWeightTarget() {
                this.dialogDisplay = true;
                this.weightType = editWeight.TYPES.TARGET;
                this.weightEdit = this.target;
            },
            async setWeights(forced = false) {
                if (forced) await dsWeights.loadFromServer(true);
                this.current = await dsWeights.getCurrent();
                this.start = await dsWeights.getStart();
                this.target = await dsWeights.getTarget();
            },
            ...mapMutations({
                setStateUserAuthenticated: 'user/setAuthenticated',
            }),
        },
        async mounted() {
            // DEFINE INNER FUNCTIONS
            /**
             * Reset Top Actions on component re-mount.
             */
            function addTopActions() {
                const actAdd = new Action();
                actAdd.icon = 'logout';
                actAdd.action = function () {
                    console.log('sign out!');
                };
                topActions.setActions([actAdd]);
            }

            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                addTopActions();
                await this.setWeights(true);
            }
        },
    };
}
