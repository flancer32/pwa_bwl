/**
 * DI-compatible wrapper for 'Chart' library.
 * 'Chart' library does not compatible with DI-container and should be loaded on front with HTML '<script>' tag.
 * @see https://www.chartjs.org/
 */
export default class Fl32_Bwl_Front_Lib_Chart {
    /** Chart object from globals. */
    #chart;

    constructor() {
        // noinspection JSValidateTypes
        /** @type {{Chart}} */
        const window = self;
        if (window.Chart) {
            this.#chart = window.Chart;
        } else {
            console.log(`
Add
<script type="application/javascript" src="js/Chart.bundle.min.js"></script>
to your startup HTML to use Chart.            
`);
        }
    }

    getCart() {
        return this.#chart;
    }
}

