/**
 * Process to save weight stats data.
 */
export default class Fl32_Bwl_Back_Process_Weight_Stat_Save {

    constructor(spec) {
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Store_RDb_Schema_Weight_Stat#']; // class constructor
        /** @type {TeqFw_Core_App_Shared_Util.formatDate} */
        const formatDate = spec['TeqFw_Core_App_Shared_Util#formatDate']; // function instance

        /**
         * Save weight stats data.
         *
         * @param trx
         * @param {Fl32_Bwl_Store_RDb_Schema_Weight_Stat} input
         * @returns {Promise<{output: {}, error: {}}>}
         */
        this.exec = async function ({trx, input}) {
            // DEFINE INNER FUNCTIONS

            /**
             * @param trx
             * @param {Fl32_Bwl_Store_RDb_Schema_Weight_Stat} item
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
            input[EWeightStat.A_DATE] = formatDate(input[EWeightStat.A_DATE]);  // prepare data
            if (await itemExists(trx, input)) {
                await trx(EWeightStat.ENTITY)
                    .update(input)
                    .where({
                        [EWeightStat.A_USER_REF]: input[EWeightStat.A_USER_REF],
                        [EWeightStat.A_DATE]: input[EWeightStat.A_DATE],
                    });
            } else {
                await trx(EWeightStat.ENTITY).insert(input);
            }
            // I don't know what I should return here
            return {output: {}, error: {}};
        };

    }

}
