/**
 * Process to save application level profile.
 */
export default class Fl32_Bwl_Back_Process_Profile_Save {

    constructor(spec) {
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile#']; // class constructor
        /**
         * Save application level profile (not user profile).
         *
         * @param trx
         * @param {Fl32_Bwl_Store_RDb_Schema_Profile} input
         * @returns {Promise<{output: {}, error: {}}>}
         */
        this.exec = async function ({trx, input}) {
            // DEFINE INNER FUNCTIONS

            async function profileExists(trx, userId) {
                const query = trx.from(EProfile.ENTITY);
                query.select([EProfile.A_USER_REF]);
                query.where(EProfile.A_USER_REF, userId);
                /** @type {Array} */
                const rs = await query;
                return (rs.length === 1);
            }


            // MAIN FUNCTIONALITY
            if (await profileExists(trx, input[EProfile.A_USER_REF])) {
                await trx(EProfile.ENTITY)
                    .update(input)
                    .where({[EProfile.A_USER_REF]: input[EProfile.A_USER_REF]});
            } else {
                await trx(EProfile.ENTITY).insert(input);
            }
            // I don't know what I should return here
            return {output: {}, error: {}};
        };

    }

}
