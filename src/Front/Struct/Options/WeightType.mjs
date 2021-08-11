/**
 * Options for 'weight type' select.
 */
export default class Fl32_Bwl_Front_Struct_Options_WeightType {
    static CURRENT = 'current';
    static TARGET = 'target';

    /**
     * Compose array with options with translated labels.
     *
     * @param {Object} widget
     * @param {string} prefix
     * @return {Array<Object<{label: (string), value: string}>>}
     */
    getItems(widget = null, prefix = '') {
        const CLS = Fl32_Bwl_Front_Struct_Options_WeightType;
        const t = (typeof widget?.$t === 'function')
        return [
            {label: t ? widget.$t(`${prefix}.${CLS.CURRENT}`) : 'Weight', value: CLS.CURRENT},
            {label: t ? widget.$t(`${prefix}.${CLS.TARGET}`) : 'Target', value: CLS.TARGET},
        ];
    }
}
