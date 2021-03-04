const template = `
<div class="t-grid app-home">
    <div class="app-home-stats">
        <q-field label="Start (kg)" readonly stack-label dense>
            <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{start}}</div>
            </template>
        </q-field>
        <q-field label="Current (kg)" readonly stack-label dense>
            <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{current}}</div>
            </template>
        </q-field>
        <q-field label="Target (kg)" readonly stack-label dense style="text-align: center">
            <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{target}}</div>
            </template>
        </q-field>
    </div>
    <div>
                <canvas id="myChart" width="100" height="100"></canvas>
    </div>
    <div class="t-grid app-home-controls">
        <div style="width: 100%">
            <q-select 
                    :options="options"
                    dense
                    label="Group"
                    options-dense
                    stack-label
                    v-model="mode"
            ></q-select>
        </div>
        <div>
            <q-btn round color="primary" icon="add" v-on:click="dialogWeightAdd=true"></q-btn>
            <add-weight
                    :init="dialogWeightAdd"
                    @onHide="dialogWeightAdd=false"
            ></add-weight>
        </div>
    </div>
</div>
`;

export default function Fl32_Bwl_Front_Route_Home(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {Fl32_Teq_User_Front_App_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];  // named singleton
    /** @type {Fl32_Bwl_Front_Widget_AddWeight} */
    const addWeight = spec['Fl32_Bwl_Front_Widget_AddWeight$'];
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    return {
        name: 'RouteHome',
        template,
        components: {addWeight},
        data: function () {
            return {
                current: 90,
                dialogWeightAdd: false,
                mode: 'Personal',
                options: ['Personal', 'StroyNjashki', 'Work'],
                start: 100,
                target: 70,
            };
        },
        computed: {
            ...mapState({
                stateTitle: state => state.title,
                stateUserAuthenticated: state => state.user.authenticated,
            })
        },
        methods: {
            draw() {
                const ctx = document.getElementById('myChart').getContext('2d');
                // @see './js/Chart.bundle.min.js' in 'index.html'
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['1', '2', '3', '4', '5', '6'],
                        datasets: [{
                            borderColor: 'rgba(250, 12, 128, 0.8)',
                            borderWidth: 2,
                            data: [62.6, 61.3, 60.5, 52.4, 63.5, 56.8],
                            fill: false,
                            label: 'Tanja',
                            pointRadius: 2,
                        }, {
                            borderColor: 'rgba(0, 0, 255, 0.8)',
                            borderWidth: 2,
                            data: [95, 92, 94, 91, 80, 88],
                            fill: false,
                            label: 'Alex',
                            pointRadius: 2,
                        }, {
                            borderColor: 'rgba(2, 132, 28, 0.8)',
                            borderWidth: 2,
                            data: [56, 55, 56, 55.6, 55.3, 52],
                            fill: false,
                            label: 'Trofa',
                            pointRadius: 2,
                        }, {
                            borderColor: 'rgba(205, 145, 12, 0.8)',
                            borderWidth: 2,
                            data: [71, 70, 68.4, 65, 67, 66],
                            fill: false,
                            label: 'Nata',
                            pointRadius: 2,
                        }, {
                            borderColor: 'rgba(202, 12, 250, 0.8)',
                            borderWidth: 2,
                            data: [70, 70, 68.4, 65, 66, 64],
                            fill: false,
                            label: 'Gusjova',
                            pointRadius: 2,
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{ticks: {fontSize: 10}}],
                            yAxes: [{ticks: {fontSize: 10}}]
                        },
                        legend: {
                            display: true,
                            labels: {
                                boxWidth: 20,
                                fontSize: 10,
                            }
                        }
                    }
                });
            },
            ...mapMutations({
                setStateUserAuthenticated: 'user/setAuthenticated',
            }),
        },
        async mounted() {
            // MAIN FUNCTIONALITY
            if (await session.checkUserAuthenticated(this.$router)) {
                // this.draw();
            }
        },
    };
}
