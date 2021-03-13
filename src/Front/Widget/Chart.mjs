/**
 * @namespace Fl32_Bwl_Front_Widget_Chart
 */

const DOM_ID_CHART = 'appChartWidget';

const template = `
<canvas id="${DOM_ID_CHART}"></canvas>
`;

/**
 * @memberOf Fl32_Bwl_Front_Widget_Chart
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const Chart = spec[DEF.DI_CHART]; // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // destructuring instance singleton
    /** @type {Fl32_Bwl_Front_Gate_Weight_History_List.gate} */
    const gateHistory = spec['Fl32_Bwl_Front_Gate_Weight_History_List$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Weight_History_List_Request} */
    const RequestHistory = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Request']; // class constructor
    /** @type {Fl32_Bwl_Front_Gate_Profile_Get.gate} */
    const gateProfile = spec['Fl32_Bwl_Front_Gate_Profile_Get$']; // function singleton
    /** @type {typeof Fl32_Bwl_Shared_Service_Route_Profile_Get_Request} */
    const RequestProfile = spec['Fl32_Bwl_Shared_Service_Route_Profile_Get#Request']; // class constructor

    /**
     * @instance
     * @memberOf Fl32_Bwl_Front_Widget_Chart
     * @name widget
     */
    const widget = {
        name: 'Chart',
        template,
        components: {},
        async mounted() {
            // DEFINE INNER FUNCTIONS
            /**
             *
             * @param {Fl32_Bwl_Shared_Service_Data_Weight_History_Item[]} items
             * @returns {{data: [], labels: []}}
             */
            function prepareItems(items) {
                const result = {labels: [], data: []};
                items.reverse();
                for (const one of items) {
                    result.labels.push(new Date(one.date));
                    result.data.push(one.weight);
                }
                return result;
            }

            function draw(series, startWeight, targetWeight) {
                // DEFINE INNER FUNCTIONS
                function onResize(chart, newSize) {
                    // TODO: use it or remove it
                    console.log('resize');
                }

                // MAIN FUNCTIONALITY
                const startDataset = new Array(series.data.length).fill(startWeight);
                const targetDataset = new Array(series.data.length).fill(targetWeight);
                const ctx = document.getElementById(DOM_ID_CHART).getContext('2d');
                const options = {
                    aspectRatio: 2, // default, should be computed
                    legend: {
                        display: true,
                        labels: {
                            boxWidth: 20,
                            fontSize: 10,
                        }
                    },
                    maintainAspectRatio: true, // default
                    onResize,
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
                            borderColor: 'rgba(250, 12, 0, 0.8)',
                            borderWidth: 1,
                            data: startDataset,
                            fill: false,
                            label: i18n.t('wg:chart.start'),
                            pointRadius: 0,
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
            const [resHistory, resProfile] = await Promise.all([
                gateHistory(new RequestHistory()),
                gateProfile(new RequestProfile()),
            ]);
            /** @type {Fl32_Bwl_Shared_Service_Data_Weight_History_Item[]} */
            const items = resHistory.items;
            /** @type {Fl32_Bwl_Shared_Service_Data_Profile} */
            const profile = resProfile.profile;
            const startWeight = Number.parseFloat(profile.weightStart).toFixed(1);
            const targetWeight = Number.parseFloat(profile.weightTarget).toFixed(1);
            const series = prepareItems(items);
            draw(series, startWeight, targetWeight);
        },
        setup() {
            const loading = ref(false);
            return {
                loading,
            };
        }
    };
    return widget;
}

export default Factory;
