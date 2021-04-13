/**
 * Display data series as line chart.
 *
 * @namespace Fl32_Bwl_Front_Realm_Pub_Widget_Chart
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Realm_Pub_Widget_Chart';
const DOM_ID_CHART = 'appChartWidget';

/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Realm_Pub_Widget_Chart
 * @returns {Fl32_Bwl_Front_Realm_Pub_Widget_Chart.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const Chart = spec[DEF.DI_CHART]; // named singleton

    // DEFINE WORKING VARS
    const template = `
<canvas id="${DOM_ID_CHART}"></canvas>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Realm_Pub_Widget_Chart
     */
    return {
        name: NS,
        template,
        props: {
            dataSet: Object,
            lineTarget: String, // "90.0"
        },
        watch: {
            dataSet(current, old) {
                // DEFINE INNER FUNCTIONS
                function draw(series, targetWeight) {
                    // DEFINE INNER FUNCTIONS
                    // MAIN FUNCTIONALITY
                    const targetDataset = new Array(series.data.length).fill(targetWeight);
                    const ctx = document.getElementById(DOM_ID_CHART).getContext('2d');
                    const options = {
                        // aspectRatio: 2, // default, should be computed
                        legend: {
                            display: true,
                            labels: {
                                boxWidth: 20,
                                fontSize: 10,
                            }
                        },
                        maintainAspectRatio: true, // default
                        scales: {
                            xAxes: [
                                {
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            'day': 'MM/DD'
                                        }
                                    },
                                    ticks: {fontSize: 10}
                                }
                            ],
                            yAxes: [{ticks: {fontSize: 10}}]
                        },
                    };
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: series.labels,
                            datasets: [{
                                borderColor: 'rgba(250, 12, 128, 0.8)',
                                borderWidth: 2,
                                data: series.data,
                                fill: false,
                                label: i18n.t('wg:chart.current'),
                                pointRadius: 2,
                            }, {
                                borderColor: 'rgba(0, 12, 128, 0.8)',
                                borderWidth: 1,
                                data: targetDataset,
                                fill: false,
                                label: i18n.t('wg:chart.target'),
                                pointRadius: 0,
                            },]
                        },
                        options,
                    });
                }

                // MAIN FUNCTIONALITY
                if (current === old) debugger;
                draw(current, this.lineTarget);
            }
        },
        async mounted() {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
