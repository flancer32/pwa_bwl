/**
 * Save application level profile.
 *
 * @namespace Fl32_Bwl_Back_Act_Profile_Save
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Act_Profile_Save';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Act_Profile_Save.process
 * @memberOf Fl32_Bwl_Back_Act_Profile_Save
 */
function Factory(spec) {
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
    const metaAppProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile.ATTR} */
    const A_APP_PROFILE = metaAppProfile.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     /**
     * Save application level profile (not user profile).
     *
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {Fl32_Bwl_Back_Store_RDb_Schema_Profile.Dto} input
     * @returns {Promise<{output: {}, error: {}}>}
     * @memberOf Fl32_Bwl_Back_Act_Profile_Save
     */
    async function process({trx, input}) {
        // DEFINE INNER FUNCTIONS

        async function profileExists(trx, userId) {
            const found = await crud.readOne(trx, metaAppProfile, {[A_APP_PROFILE.USER_REF]: userId});
            return (found !== null);
        }

        // MAIN FUNCTIONALITY
        if (await profileExists(trx, input[A_APP_PROFILE.USER_REF])) {
            input.date_updated = new Date();
            await crud.updateOne(trx, metaAppProfile, input);
        } else {
            await crud.create(trx, metaAppProfile, input);
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
