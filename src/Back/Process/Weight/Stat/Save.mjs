/**
 * Save weight stats data for the date.
 *
 * @namespace Fl32_Bwl_Back_Process_Weight_Stat_Save
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Weight_Stat_Save';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Weight_Stat_Save.process
 * @memberOf Fl32_Bwl_Back_Process_Weight_Stat_Save
 */
function Factory(spec) {
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
    const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#']; 
    /** @function {@type TeqFw_Core_Shared_Util.formatUtcDate} */
    const formatUtcDate = spec['TeqFw_Core_Shared_Util#formatUtcDate']; // function instance

    /**
     * Save weight stats data for the date.
     *
     * @param trx
     * @param {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} payload
     * @returns {Promise<{output: {}, error: {}}>}
     * @memberOf Fl32_Bwl_Back_Process_Weight_Stat_Save
     */
    async function process({trx, payload}) {
        // DEFINE INNER FUNCTIONS

        /**
         * @param trx
         * @param {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} item
         * @returns {Promise<boolean>}
         */
        async function itemExists(trx, item) {
            const query = trx.from(EWeightStat.ENTITY);
            query.select([EWeightStat.A_USER_REF, EWeightStat.A_DATE]);
            query.where({
                [EWeightStat.A_USER_REF]: item.user_ref,
                [EWeightStat.A_DATE]: item.date
            });
            /** @type {Array} */
            const rs = await query;
            return (rs.length === 1);
        }


        // MAIN FUNCTIONALITY
        payload[EWeightStat.A_DATE] = formatUtcDate(payload[EWeightStat.A_DATE]);  // prepare data
        if (await itemExists(trx, payload)) {
            await trx(EWeightStat.ENTITY)
                .update(payload)
                .where({
                    [EWeightStat.A_USER_REF]: payload[EWeightStat.A_USER_REF],
                    [EWeightStat.A_DATE]: payload[EWeightStat.A_DATE],
                });
        } else {
            await trx(EWeightStat.ENTITY).insert(payload);
        }
        // I don't know what I should return here
        return {output: {}, error: {}};
    }

    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
