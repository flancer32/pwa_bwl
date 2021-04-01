/**
 * @namespace Fl32_Bwl_Shared_Util
 */

/**
 * Convert local date to 'jue, 18 mar 2021'.
 * @param {Date|string|null} dateIn
 * @param {String} lang 'es-ES'
 * @return {string} 'jue, 18 mar 2021'
 * @memberOf Fl32_Bwl_Shared_Util
 */
function formatDate(lang, dateIn = null) {
    /** @type {Date} */
    const date = (dateIn) ?
        (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
        new Date();
    const opts = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString(lang, opts);
}

export {
    formatDate,
};
