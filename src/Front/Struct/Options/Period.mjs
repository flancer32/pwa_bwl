/**
 * Options for 'period' select.
 */
export default class Fl32_Bwl_Front_Struct_Options_Period {
    static ALL = 'all';
    static MONTH_1 = 'm1';
    static MONTH_2 = 'm2';
    static MONTH_6 = 'm6';
    static WEEK_1 = 'w1';
    static WEEK_2 = 'w2';

    /**
     * Compose array with options with translated labels.
     *
     * @param {Object} widget
     * @param {string} prefix
     * @return {Array<Object<{label: (string), value: string}>>}
     */
    getItems(widget = null, prefix = '') {
        const SELF = Fl32_Bwl_Front_Struct_Options_Period;
        const t = (typeof widget?.$t === 'function')
        return [
            {label: t ? widget.$t(`${prefix}.${SELF.ALL}`) : 'All', value: SELF.ALL},
            {label: t ? widget.$t(`${prefix}.${SELF.WEEK_1}`) : 'All', value: SELF.WEEK_1},
            {label: t ? widget.$t(`${prefix}.${SELF.WEEK_2}`) : 'All', value: SELF.WEEK_2},
            {label: t ? widget.$t(`${prefix}.${SELF.MONTH_1}`) : 'All', value: SELF.MONTH_1},
            {label: t ? widget.$t(`${prefix}.${SELF.MONTH_2}`) : 'All', value: SELF.MONTH_2},
            {label: t ? widget.$t(`${prefix}.${SELF.MONTH_6}`) : 'All', value: SELF.MONTH_6},
        ];
    }
}
