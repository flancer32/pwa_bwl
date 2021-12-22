export default class Fl32_Bwl_Front_Door_Pub_Widget_Home_Route_SeriesLoader {
    /** @type {typeof Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart.ChartData} */
    #ChartData;
    /** @type {typeof Fl32_Bwl_Shared_Enum_Weight_Type} */
    #WeightType;
    /** @type {typeof Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart.Point} */
    #Point;
    /** @type {TeqFw_Web_Front_WAPI_Gate} */
    #gate;
    /** @type {Fl32_Bwl_Shared_Service_Route_Weight_History_List.Factory} */
    #routeHistory;

    constructor(spec) {
        // EXTRACT DEPS
        this.#ChartData = spec['Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart#ChartData'];
        this.#WeightType = spec['Fl32_Bwl_Shared_Enum_Weight_Type$'];
        this.#Point = spec['Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart#Point'];
        this.#gate = spec['TeqFw_Web_Front_WAPI_Gate$'];
        this.#routeHistory = spec['Fl32_Bwl_Shared_Service_Route_Weight_History_List#Factory$'];
    }

    /**
     * @param {number|null} friendId
     * @param {Date} periodBegin
     * @param {Date} periodEnd
     * @param {string} profileTarget
     * @return {Promise<Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart.ChartData>}
     */
    async load(friendId, periodBegin, periodEnd, profileTarget) {
        // PARSE INPUT & DEFINE WORKING VARS
        const gate = this.#gate;
        const Point = this.#Point;
        const routeHistory = this.#routeHistory;
        const WeightType = this.#WeightType;

        // DEFINE INNER FUNCTIONS
        /**
         * Load weight historical data from server.
         * @param {Date} from
         * @param {Date} to
         * @param {Fl32_Bwl_Shared_Enum_Weight_Type} type
         * @param {number|null} userId if 'null' then load own data else - load friend data
         * @return {Promise<(*[]|Date)[]>}
         */
        async function getFromServer(from, to, type, userId = null) {
            const points = [];
            let dateFirst;
            const req = routeHistory.createReq();
            req.dateFrom = from;
            req.dateTo = to;
            req.friendId = userId;
            req.type = type;
            // noinspection JSValidateTypes
            const res = await gate.send(req, routeHistory);
            if (res) {
                for (const one of res.items) {
                    const date = new Date(one.date);
                    if (dateFirst === undefined) dateFirst = date;
                    const point = new Point();
                    point.x = date.getTime();
                    point.y = one.weight;
                    points.push(point);
                }
            }
            return [points, dateFirst];
        }

        // MAIN FUNCTIONALITY
        const res = new this.#ChartData();
        let secPoints, secDateFirst;
        const dbDateFrom = new Date(periodBegin);
        const dbDateTo = new Date(periodEnd);
        dbDateFrom.setUTCHours(0, 0, 0, 0);
        dbDateTo.setDate(periodEnd.getDate() + 1);
        dbDateTo.setUTCHours(0, 0, 0, 0);

        // get current weights
        const [primPoints, primDateFirst] = await getFromServer(dbDateFrom, dbDateTo, WeightType.CURRENT);
        // get friend weights or own target weights
        if (friendId) {
            const [points, dateFirst] = await getFromServer(dbDateFrom, dbDateTo, WeightType.CURRENT, friendId);
            secPoints = points;
            secDateFirst = dateFirst;
        } else {
            const [points, dateFirst] = await getFromServer(dbDateFrom, dbDateTo, WeightType.TARGET);
            secPoints = points;
            secDateFirst = dateFirst;
        }
        // get start and end of the labels interval
        const dateFrom = (dbDateFrom.getTime() <= 0)
            ? (primDateFirst < secDateFirst) ? primDateFirst : secDateFirst
            : dbDateFrom;
        const dateTo = dbDateTo;
        dateFrom.setHours(0, 0, 0, 0);
        dateTo.setHours(0, 0, 0, 0);

        if (!friendId) {
            // there are no target points in the interval
            if (secPoints.length === 0) {
                const first = new Point();
                first.x = dateFrom.getTime();
                first.y = Number.parseFloat(profileTarget);
                secPoints.unshift(first);
                const last = new Point();
                last.x = dateTo.getTime();
                last.y = Number.parseFloat(profileTarget);
                secPoints.push(last);
            } else {
                // pull the first target point to start of interval
                /** @type {Fl32_Bwl_Front_Door_Pub_Widget_Home_Chart.Point} */
                const firstPoint = secPoints[0];
                if (firstPoint.x > dateFrom.getTime()) {
                    const point = new Point();
                    point.x = dateFrom.getTime();
                    point.y = firstPoint.y;
                    secPoints.unshift(point);
                }
                // pull the last target point to end of interval
                const lastPoint = secPoints[secPoints.length - 1];
                if (lastPoint.x < dateTo.getTime()) {
                    const point = new Point();
                    point.x = dateTo.getTime();
                    point.y = lastPoint.y;
                    secPoints.push(point);
                }
            }
        }

        // COMPOSE RESULT
        res.labels = [dateFrom, dateTo];
        res.primary = primPoints;
        res.secondary = secPoints;
        return res;
    }
}
