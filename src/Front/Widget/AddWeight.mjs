const EVT_HIDE = 'onHide';

const I18N_BUNDLE = {
    cancel: 'Cancel',
    hint: 'Your current weight (kg)',
    ok: 'OK',
    title: 'Add weight',
};

const template = `
<q-dialog v-model="display" @hide="onHide">
    <q-card style="min-width: 350px">
        <div class="t-grid cols align-items-center" >
            <div class="text-h7">{{$t('addWeight:title')}}</div>
            <div class="text-h7" style="text-align: end">{{dateFormatted}}</div>
        </div>

        <q-card-section class="q-pt-none">
            <q-input v-model="weight" autofocus @keyup.enter="submit" :hint="$t('addWeight:hint')"></q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('addWeight:cancel')" v-close-popup></q-btn>
            <q-btn flat :label="$t('addWeight:ok')" v-close-popup v-on:click="submit"></q-btn>
        </q-card-actions>
    </q-card>
</q-dialog>    
`;

function Fl32_Bwl_Front_Widget_AddWeight(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    const i18next = spec[DEF.MOD_CORE.DI_I18N];   // named singleton
    /** @type {Fl32_Bwl_Front_Gate_Weight_Stat_Save.gate} */
    const gate = spec['Fl32_Bwl_Front_Gate_Weight_Stat_Save$']; // function instance
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save_Request} */
    const Request = spec['Fl32_Bwl_Shared_Service_Route_Weight_Stat_Save#Request']; // class constructor

    i18next.addResourceBundle('dev', 'addWeight', I18N_BUNDLE, true);

    return {
        name: 'AddWeight',
        template,
        components: {},
        data: function () {
            return {
                display: false, // internal attribute for the dialog
                weight: 0.0,
            };
        },
        props: {
            init: false, // API to get values from parent widget
        },
        computed: {
            /** @returns {Date} */
            date() {
                return new Date();
            },
            dateFormatted() {
                return this.date.toLocaleDateString(i18next.language, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            },
            title() {
                return this.$t('addWeight:title') + this.dateFormatted;
            },
        },
        methods: {
            onHide() {
                this.$emit(EVT_HIDE);
            },
            async submit() {
                const req = new Request();
                req.date = this.date;
                req.weight = this.weight;
                await gate(req);
                this.display = false;
            },
        },
        watch: {
            init(current) {
                this.display = current;
            }
        },
        emits: [EVT_HIDE],
    };
}

export default Fl32_Bwl_Front_Widget_AddWeight;
