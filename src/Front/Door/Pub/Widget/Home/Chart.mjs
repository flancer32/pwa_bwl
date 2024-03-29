/**
 * Display data series as line chart.
 * Define structures 'Point' & 'ChartData' to pass data to this widget.
 *
 * Various charts list: https://code.tutsplus.com/articles/best-free-javascript-charts-libraries--cms-37458
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
    /**
     * @type {boolean}
     * @deprecated  we don't need normalization anymore with 2 Y axes
     */
    normalize;
    /** @type {Point[]} */
    primary;
    /** @type {Point[]} */
    secondary;
    /**
     * 2 Y-axes are used to display friend's data
     * @type {boolean}
     */
    useSecondY;
}

Object.defineProperty(ChartData, 'name', {value: `${NS}.${ChartData.name}`});

/**
 * Chart point (https://www.chartjs.org/docs/latest/general/data-structures.html#object)
 * @memberOf Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart
 */
class Point {
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
                /**
                 * @param {ChartData} chartData
                 */
                function draw(chartData) {
                    // DEFINE INNER FUNCTIONS
                    /**
                     * Convert input series 'data' into series with length less then 'maxPoints'.
                     * @param {Point[]} data
                     * @param {boolean} normalize normalize series if 'true'
                     * @param {number} xStart
                     * @param {number} xEnd
                     * @param {number} maxPoints
                     * @return {*[]}
                     */
                    function prepareSeries(data, normalize, xStart, xEnd, maxPoints) {
                        // PARSE INPUT & DEFINE WORKING VARS
                        const VAL = 'val', COUNT = 'count', X = 'x';

                        // DEFINE INNER FUNCTIONS
                        /**
                         * @param {Array} data
                         * @param {number} delta
                         * @param {boolean} norm
                         * @return {Point[]}
                         */
                        function makeArray(data, delta, norm) {
                            const res = [];
                            let maxVal = Number.MIN_SAFE_INTEGER;
                            for (const i in data) {
                                const one = data[i];
                                const point = new Point();
                                if (one[COUNT] === 1) {
                                    point.x = one[X];
                                    point.y = one[VAL];
                                } else {
                                    point.x = xStart + (delta * i);
                                    point.y = (one[VAL] / one[COUNT]).toFixed(1);
                                }
                                res.push(point);
                                maxVal = Math.max(maxVal, point.y);
                            }
                            if (norm && (maxVal > 1)) {
                                for (const one of res) {
                                    one.y = ((one.y / maxVal) * 100).toFixed(2);
                                }
                            }
                            return res;
                        }

                        // MAIN FUNCTIONALITY
                        const space = []; // array of objects {val, count}
                        const delta = Math.floor((xEnd - xStart) / maxPoints);
                        for (const one of data) {
                            const i = Math.floor((one.x - xStart) / delta);
                            if (space[i] === undefined) {
                                space[i] = {[VAL]: Number.parseFloat(one.y), [COUNT]: 1, [X]: one.x};
                            } else {
                                space[i][VAL] += Number.parseFloat(one.y);
                                space[i][COUNT] += 1;
                            }
                        }
                        return makeArray(space, delta, normalize);
                    }

                    // MAIN FUNCTIONALITY
                    const norm = false;
                    const labels = chartData.labels;
                    const parent = document.getElementById(DOM_ID_CHART).parentElement;
                    const width = parent.offsetWidth;
                    const maxPoints = Math.floor(width / 15);
                    const xStart = chartData.labels[0].getTime();
                    const xEnd = chartData.labels[chartData.labels.length - 1].getTime();
                    const primary = prepareSeries(chartData.primary, norm, xStart, xEnd, maxPoints);
                    const secondary = prepareSeries(chartData.secondary, norm, xStart, xEnd, maxPoints);
                    const datasets = [];
                    // add primary data set to chart
                    datasets.push({
                        borderColor: 'rgba(250, 12, 128, 0.8)',
                        borderWidth: 2,
                        data: primary,
                        fill: false,
                        label: chartData.namePrimary,
                        pointRadius: 2,
                    });
                    // add secondary data set to chart
                    const ds2 = {
                        borderColor: 'rgba(0, 12, 128, 0.8)',
                        borderWidth: 2,
                        data: secondary,
                        fill: false,
                        label: chartData.nameSecondary,
                        pointRadius: 2,
                    };
                    datasets.push(ds2);
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
                                ticks: {
                                    font: {size: 10}
                                }
                            },
                            y: {
                                position: 'left',
                                ticks: {
                                    font: {size: 10}
                                }
                            },
                        },
                    };
                    if (chartData.useSecondY) {
                        ds2.yAxisID = 'y1';
                        options.scales.y.ticks.color = 'rgba(250, 12, 128, 0.8)';
                        options.scales.y1 = {
                            position: 'right',
                            grid: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                            ticks: {
                                color: 'rgba(0, 12, 128, 0.8)',
                                font: {size: 10}
                            }
                        };
                    }
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
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    ChartData,
    Factory as default,
    Point,
};
