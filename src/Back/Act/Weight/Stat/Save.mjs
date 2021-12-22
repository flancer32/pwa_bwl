/**
 * Save weight stats data for the date.
 *
 * @namespace Fl32_Bwl_Back_Act_Weight_Stat_Save
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Weight_Stat_Save';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Weight_Stat_Save.process
 * @memberOf Fl32_Bwl_Back_Act_Weight_Stat_Save
 */
function Factory(spec) {
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
    /** @type {TeqFw_Core_Shared_Util.formatUtcDate|function} */
    const formatUtcDate = spec['TeqFw_Core_Shared_Util#formatUtcDate'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
    const metaWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.ATTR} */
    const A_WEIGHT_STAT = metaWeightStat.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     * Save weight stats data for the date.
     *
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.Dto} payload
     * @returns {Promise<{output: {}, error: {}}>}
     * @memberOf Fl32_Bwl_Back_Act_Weight_Stat_Save
     */
    async function process({trx, payload}) {
        // DEFINE INNER FUNCTIONS

        /**
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @param {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.Dto} item
         * @returns {Promise<boolean>}
         */
        async function itemExists(trx, item) {
            const found = await crud.readOne(trx, metaWeightStat, {
                [A_WEIGHT_STAT.USER_REF]: item.user_ref,
                [A_WEIGHT_STAT.DATE]: item.date,
                [A_WEIGHT_STAT.TYPE]: item.type,
            });
            return (found !== null);
        }

        // MAIN FUNCTIONALITY
        payload[A_WEIGHT_STAT.DATE] = formatUtcDate(payload[A_WEIGHT_STAT.DATE]);  // prepare data
        if (await itemExists(trx, payload)) {
            await crud.updateOne(trx, metaWeightStat, payload);
        } else {
            await crud.create(trx, metaWeightStat, payload);
        }
        // I don't know what I should return here
        return {output: {}, error: {}};
    }

    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
