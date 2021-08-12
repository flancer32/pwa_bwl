/**
 * Display data series as line chart.
 *
 * @namespace Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart';
const DOM_ID_CHART = 'appChartWidget';

// MODULE'S CLASSES
/**
 * Structure for props to put data to the chart widget.
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart
 */
class ChartData {
    /** @type {Date[]} */
    labels;
    /** @type {string} */
    namePrimary;
    /** @type {string} */
    nameSecondary;
    /** @type {number[]} */
    primary;
    /** @type {number[]} */
    secondary;
}

Object.defineProperty(ChartData, 'name', {value: `${NS}.${ChartData.name}`});

/**
 * Chart point (https://www.chartjs.org/docs/latest/general/data-structures.html#object)
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart
 */
export class Point {
    x;
    y;
}

Object.defineProperty(Point, 'name', {value: `${NS}.${Point.name}`});

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart
 * @returns {Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Front_Defaults} */
    const DEF = spec['Fl32_Bwl_Front_Defaults$'];
    /** @type {Fl32_Bwl_Front_Lib_Chart} */
    const ChartLib = spec['Fl32_Bwl_Front_Lib_Chart$'];

    // DEFINE WORKING VARS
    const Chart = ChartLib.getCart();
    let chart; // we can have one only chart bound to the DOM-element.

    const template = `
<canvas id="${DOM_ID_CHART}"></canvas>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        props: {
            chartData: ChartData,
        },
        watch: {
            /**
             *
             * @param {ChartData} current
             * @param {ChartData} old
             */
            chartData(current, old) {
                // DEFINE INNER FUNCTIONS
                function draw(charData) {
                    // PARSE INPUT & DEFINE WORKING VARS
                    const labels = charData.labels;

                    // MAIN FUNCTIONALITY
                    const datasets = [];
                    // add primary data set to chart
                    datasets.push({
                        borderColor: 'rgba(250, 12, 128, 0.8)',
                        borderWidth: 2,
                        data: charData.primary,
                        fill: false,
                        label: charData.namePrimary,
                        pointRadius: 2,
                    });
                    // add secondary data set to chart
                    datasets.push({
                        borderColor: 'rgba(0, 12, 128, 0.8)',
                        borderWidth: 2,
                        data: charData.secondary,
                        fill: false,
                        label: charData.nameSecondary,
                        pointRadius: 2,
                    });
                    const options = {
                        aspectRatio: 2, // default, should be computed
                        cubicInterpolationMode: 'monotone',
                        legend: {
                            display: true,
                            labels: {
                                boxWidth: 20,
                                fontSize: 10,
                            }
                        },
                        maintainAspectRatio: true, // default
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    // see https://moment.github.io/luxon/#/formatting?id=table-of-tokens
                                    displayFormats: {
                                        hour: 'MM/dd',
                                        day: 'MM/dd',
                                        month: 'yy/MM'
                                    }
                                },
                                ticks: {font: {size: 10}}
                            },
                            y: {
                                ticks: {font: {size: 10}}
                            }
                        },
                    };
                    // place chart to display
                    const ctx = document.getElementById(DOM_ID_CHART).getContext('2d');
                    if (chart) chart.destroy();
                    chart = new Chart(ctx, {
                        type: 'line',
                        data: {labels, datasets},
                        options,
                    });
                }

                // MAIN FUNCTIONALITY
                if (current === old) debugger;
                draw(current);
            }
        },
        async mounted() {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    ChartData,
    Factory as default,
};
