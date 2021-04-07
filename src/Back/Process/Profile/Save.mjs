/**
 * Save application level profile.
 *
 * @namespace Fl32_Bwl_Back_Process_Profile_Save
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Profile_Save';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Profile_Save.process
 * @memberOf Fl32_Bwl_Back_Process_Profile_Save
 */
function Factory(spec) {
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
    const EProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile#']; // class

    /**
     /**
     * Save application level profile (not user profile).
     *
     * @param trx
     * @param {Fl32_Bwl_Store_RDb_Schema_Profile} input
     * @returns {Promise<{output: {}, error: {}}>}
     * @memberOf Fl32_Bwl_Back_Process_Profile_Save
     */
    async function process({trx, input}) {
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
            input.date_updated = new Date();
            await trx(EProfile.ENTITY)
                .update(input)
                .where({[EProfile.A_USER_REF]: input[EProfile.A_USER_REF]});
        } else {
            await trx(EProfile.ENTITY).insert(input);
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
