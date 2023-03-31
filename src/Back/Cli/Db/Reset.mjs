/**
 * Reset database structures and initialize test data.
 *
 * @namespace Fl32_Bwl_Back_Cli_Db_Reset
 */
// MODULE'S IMPORT
import $bcrypt from 'bcrypt';

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Back_Cli_Db_Reset';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Reset
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Bwl_Back_Defaults} */
    const DEF = spec['Fl32_Bwl_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const connector = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
    /** @type {Fl32_Bwl_Back_Cli_Db_Z_Restruct.action|function} */
    const actRestruct = spec['Fl32_Bwl_Back_Cli_Db_Z_Restruct$'];
    /** @type {TeqFw_User_Back_Store_RDb_Schema_User} */
    const metaUser = spec['TeqFw_User_Back_Store_RDb_Schema_User$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Profile} */
    const metaUserProfile = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Profile$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Password} */
    const metaAuthPass = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Password$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Session} */
    const metaAuthSess = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Session$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email} */
    const metaIdEmail = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Id_Phone} */
    const metaIdPhone = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Id_Phone$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Link} */
    const metaRefLink = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Link$'];
    /** @type {Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Tree} */
    const metaRefTree = spec['Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Tree$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
    const metaWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat$'];
    /** @type {Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
    const metaAppProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile$'];
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.STAT_TYPE} */
    const TYPE_WEIGHT = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#STAT_TYPE$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Profile.ATTR} */
    const A_USER_PROFILE = metaUserProfile.getAttributes();
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Password.ATTR} */
    const A_AUTH_PASS = metaAuthPass.getAttributes();
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Auth_Session.ATTR} */
    const A_AUTH_SESS = metaAuthSess.getAttributes();
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Id_Email.ATTR} */
    const A_ID_EMAIL = metaIdEmail.getAttributes();
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Id_Phone.ATTR} */
    const A_ID_PHONE = metaIdPhone.getAttributes();
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Link.ATTR} */
    const A_REF_LINK = metaRefLink.getAttributes();
    /** @type {typeof Fl32_Teq_User_Back_Store_RDb_Schema_Ref_Tree.ATTR} */
    const A_REF_TREE = metaRefTree.getAttributes();
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.ATTR} */
    const A_WEIGHT_STAT = metaWeightStat.getAttributes();
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile.ATTR} */
    const A_APP_PROFILE = metaAppProfile.getAttributes();

    // DEFINE INNER FUNCTIONS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Core_Back_Cli_Version
     */
    const action = async function () {
        // DEFINE INNER FUNCTIONS
        /**
         * Compose queries to insert data into the tables.
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         */
        async function populateWithData(trx) {
            // DEFINE INNER FUNCTIONS

            /**
             * @param {TeqFw_Db_Back_RDb_ITrans} trx
             * @return {Promise<void>}
             */
            async function insertProfiles(trx) {
                await crud.create(trx, metaAppProfile, {
                    [A_APP_PROFILE.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_APP_PROFILE.AGE]: 48,
                    [A_APP_PROFILE.HEIGHT]: 175,
                    [A_APP_PROFILE.IS_FEMALE]: false,
                });
                await crud.create(trx, metaAppProfile, {
                    [A_APP_PROFILE.USER_REF]: DEF.DATA_USER_ID_CUST,
                    [A_APP_PROFILE.AGE]: 32,
                    [A_APP_PROFILE.HEIGHT]: 165,
                    [A_APP_PROFILE.IS_FEMALE]: true,
                });
            }

            /**
             * @param {TeqFw_Db_Back_RDb_ITrans} trx
             * @return {Promise<void>}
             */
            async function insertSessions(trx) {
                await crud.create(trx, metaAuthSess, {
                    [A_AUTH_SESS.SESSION_ID]: DEF.DATA_SESS_ID_ADMIN,
                    [A_AUTH_SESS.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                });
                await crud.create(trx, metaAuthSess, {
                    [A_AUTH_SESS.SESSION_ID]: DEF.DATA_SESS_ID_CUST,
                    [A_AUTH_SESS.USER_REF]: DEF.DATA_USER_ID_CUST,
                });
            }

            /**
             * @param {TeqFw_Db_Back_RDb_ITrans} trx
             * @return {Promise<void>}
             */
            async function insertUsers(trx) {
                const isPg = trx.isPostgres();
                // users
                const dtoUserAdmin = metaUser.createDto();
                const dtoUserCust = metaUser.createDto();
                if (isPg) {
                    dtoUserAdmin.id = DEF.DATA_USER_ID_ADMIN;
                    dtoUserCust.id = DEF.DATA_USER_ID_CUST;
                }
                await crud.create(trx, metaUser, dtoUserAdmin);
                await crud.create(trx, metaUser, dtoUserCust);
                // user profile
                await crud.create(trx, metaUserProfile, {
                    [A_USER_PROFILE.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_USER_PROFILE.NAME]: 'Admin',
                });
                await crud.create(trx, metaUserProfile, {
                    [A_USER_PROFILE.USER_REF]: DEF.DATA_USER_ID_CUST,
                    [A_USER_PROFILE.NAME]: 'Customer',
                });
                // authentication data
                const hash1 = await $bcrypt.hash('test', DEF.MOD_USER.BCRYPT_HASH_ROUNDS);
                const hash2 = await $bcrypt.hash('test', DEF.MOD_USER.BCRYPT_HASH_ROUNDS);
                await crud.create(trx, metaAuthPass, {
                    [A_AUTH_PASS.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_AUTH_PASS.LOGIN]: 'admin',
                    [A_AUTH_PASS.PASSWORD_HASH]: hash1,
                });
                await crud.create(trx, metaAuthPass, {
                    [A_AUTH_PASS.USER_REF]: DEF.DATA_USER_ID_CUST,
                    [A_AUTH_PASS.LOGIN]: 'cust',
                    [A_AUTH_PASS.PASSWORD_HASH]: hash2,
                });
                await crud.create(trx, metaIdEmail, {
                    [A_ID_EMAIL.EMAIL]: 'flancer64@gmail.com',
                    [A_ID_EMAIL.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                });
                await crud.create(trx, metaIdPhone, {
                    [A_ID_PHONE.PHONE]: '(371)29181801',
                    [A_ID_PHONE.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                });
                const expiredAt = new Date();
                expiredAt.setUTCDate(expiredAt.getUTCDate() + 1);
                await crud.create(trx, metaRefLink, {
                    [A_REF_LINK.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_REF_LINK.CODE]: DEF.DATA_REF_CODE_ROOT,
                    [A_REF_LINK.DATE_EXPIRED]: expiredAt,
                });
                await crud.create(trx, metaRefLink, {
                    [A_REF_LINK.USER_REF]: DEF.DATA_USER_ID_CUST,
                    [A_REF_LINK.CODE]: DEF.DATA_REF_CODE_OTHER,
                    [A_REF_LINK.DATE_EXPIRED]: expiredAt,
                });
                // users tree
                await crud.create(trx, metaRefTree, {
                    [A_REF_TREE.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_REF_TREE.PARENT_REF]: DEF.DATA_USER_ID_ADMIN,
                });
                await crud.create(trx, metaRefTree, {
                    [A_REF_TREE.USER_REF]: DEF.DATA_USER_ID_CUST,
                    [A_REF_TREE.PARENT_REF]: DEF.DATA_USER_ID_ADMIN,
                });
            }

            /**
             * @param {TeqFw_Db_Back_RDb_ITrans} trx
             * @return {Promise<void>}
             */
            async function insertWeightStats(trx) {
                // CURRENT
                await crud.create(trx, metaWeightStat, {
                    [A_WEIGHT_STAT.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_WEIGHT_STAT.DATE]: '2021-10-01',
                    [A_WEIGHT_STAT.TYPE]: TYPE_WEIGHT.CURRENT,
                    [A_WEIGHT_STAT.VALUE]: 92.3,
                });
                await crud.create(trx, metaWeightStat, {
                    [A_WEIGHT_STAT.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_WEIGHT_STAT.DATE]: '2021-10-02',
                    [A_WEIGHT_STAT.TYPE]: TYPE_WEIGHT.CURRENT,
                    [A_WEIGHT_STAT.VALUE]: 90.4,
                });
                await crud.create(trx, metaWeightStat, {
                    [A_WEIGHT_STAT.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_WEIGHT_STAT.DATE]: '2021-10-05',
                    [A_WEIGHT_STAT.TYPE]: TYPE_WEIGHT.CURRENT,
                    [A_WEIGHT_STAT.VALUE]: 91.1,
                });
                await crud.create(trx, metaWeightStat, {
                    [A_WEIGHT_STAT.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_WEIGHT_STAT.DATE]: '2021-10-10',
                    [A_WEIGHT_STAT.TYPE]: TYPE_WEIGHT.CURRENT,
                    [A_WEIGHT_STAT.VALUE]: 89.9,
                });
                await crud.create(trx, metaWeightStat, {
                    [A_WEIGHT_STAT.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_WEIGHT_STAT.DATE]: '2021-10-15',
                    [A_WEIGHT_STAT.TYPE]: TYPE_WEIGHT.CURRENT,
                    [A_WEIGHT_STAT.VALUE]: 89.4,
                });
                await crud.create(trx, metaWeightStat, {
                    [A_WEIGHT_STAT.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_WEIGHT_STAT.DATE]: '2021-10-24',
                    [A_WEIGHT_STAT.TYPE]: TYPE_WEIGHT.CURRENT,
                    [A_WEIGHT_STAT.VALUE]: 88.9,
                });
                // TARGET
                await crud.create(trx, metaWeightStat, {
                    [A_WEIGHT_STAT.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_WEIGHT_STAT.DATE]: '2021-10-01',
                    [A_WEIGHT_STAT.TYPE]: TYPE_WEIGHT.TARGET,
                    [A_WEIGHT_STAT.VALUE]: 92.0,
                });
                await crud.create(trx, metaWeightStat, {
                    [A_WEIGHT_STAT.USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [A_WEIGHT_STAT.DATE]: '2021-10-24',
                    [A_WEIGHT_STAT.TYPE]: TYPE_WEIGHT.TARGET,
                    [A_WEIGHT_STAT.VALUE]: 90.0,
                });
            }

            // MAIN FUNCTIONALITY
            await insertUsers(trx);
            await insertSessions(trx);
            await insertProfiles(trx);
            await insertWeightStats(trx);
        }

        // MAIN FUNCTIONALITY
        logger.pause(false);
        const trx = await connector.startTransaction();
        try {
            // recreate DB structure
            await actRestruct();
            // perform queries to insert data into created tables
            await populateWithData(trx);
            // perform queries to insert data and commit changes
            await trx.commit();
        } catch (e) {
            await trx.rollback();
            logger.error(`${e.toString()}`);
        }
        await connector.disconnect();
    };
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'db-reset';
    res.desc = 'Reset database structures and initialize test data.';
    res.action = action;
    return res;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
