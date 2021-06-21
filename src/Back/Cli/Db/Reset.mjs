/**
 * @namespace Fl32_Bwl_Back_Cli_Db_Reset
 */
// MODULE'S IMPORT
import $bcrypt from 'bcrypt';

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Back_Cli_Db_Reset';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command to reset database structures and initialize test data.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @returns {TeqFw_Core_App_Cli_Command_Data}
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Reset
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];   // singleton
    /** @type {Fl32_Teq_User_Defaults} */
    const DEF_USER = spec['Fl32_Teq_User_Defaults$'];   // singleton
    /** @type {typeof TeqFw_Core_App_Cli_Command_Data} */
    const DCommand = spec['TeqFw_Core_App_Cli_Command#Data'];    // class
    /** @type {TeqFw_Core_App_Db_Connector} */
    const connector = spec['TeqFw_Core_App_Db_Connector$']; // singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // singleton
    const {isPostgres} = spec['TeqFw_Core_App_Back_Util_RDb']; // ES6 destruct
    /** @function {@type Fl32_Bwl_Back_Cli_Db_Z_Restruct.action} */
    const actRestruct = spec['Fl32_Bwl_Back_Cli_Db_Z_Restruct$']; // singleton
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
    const EAppProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#']; // class
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
    const EAppWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Teq_User_Store_RDb_Schema_User#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Auth_Password} */
    const EUserAuthPass = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Password#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Auth_Session} */
    const EUserAuthSess = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Session#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Email} */
    const EUserIdEmail = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Email#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Id_Phone} */
    const EUserIdPhone = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Phone#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Profile} */
    const EUserProfile = spec['Fl32_Teq_User_Store_RDb_Schema_Profile#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Ref_Link} */
    const EUserRefLink = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Link#']; // class
    /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_Ref_Tree} */
    const EUserRefTree = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Tree#']; // class

    // DEFINE INNER FUNCTIONS
    /**
     * Reset database structures and initialize test data.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Core_App_Cli_Version
     */
    const action = async function () {
        // DEFINE INNER FUNCTIONS
        /**
         * Compose queries to insert data into the tables.
         * @param trx
         */
        async function populateWithData(trx) {
            // DEFINE INNER FUNCTIONS

            async function insertProfiles(trx) {
                await trx(EAppProfile.ENTITY).insert([{
                    [EAppProfile.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppProfile.A_AGE]: 48,
                    [EAppProfile.A_HEIGHT]: 175,
                    [EAppProfile.A_IS_FEMALE]: false,
                    [EAppProfile.A_WEIGHT_TARGET]: 90,
                }, {
                    [EAppProfile.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EAppProfile.A_AGE]: 47,
                    [EAppProfile.A_HEIGHT]: 165,
                    [EAppProfile.A_IS_FEMALE]: true,
                    [EAppProfile.A_WEIGHT_TARGET]: 58,
                }]);
            }

            async function insertSessions(trx) {
                await trx(EUserAuthSess.ENTITY).insert([{
                    [EUserAuthSess.A_SESSION_ID]: DEF.DATA_SESS_ID_ADMIN,
                    [EUserAuthSess.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                }, {
                    [EUserAuthSess.A_SESSION_ID]: DEF.DATA_SESS_ID_CUST,
                    [EUserAuthSess.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                }]);
            }

            async function insertUsers(trx) {
                const isPg = isPostgres(trx.client);

                await trx(EUser.ENTITY).insert([
                    {[EUser.A_ID]: isPg ? undefined : DEF.DATA_USER_ID_ADMIN},
                    {[EUser.A_ID]: isPg ? undefined : DEF.DATA_USER_ID_CUST},
                ]);
                await trx(EUserProfile.ENTITY).insert([
                    {[EUserProfile.A_USER_REF]: DEF.DATA_USER_ID_ADMIN, [EUserProfile.A_NAME]: 'Admin'},
                    {[EUserProfile.A_USER_REF]: DEF.DATA_USER_ID_CUST, [EUserProfile.A_NAME]: 'Customer'},
                ]);
                const hash1 = await $bcrypt.hash('test', DEF_USER.BCRYPT_HASH_ROUNDS);
                const hash2 = await $bcrypt.hash('test', DEF_USER.BCRYPT_HASH_ROUNDS);
                await trx(EUserAuthPass.ENTITY).insert([
                    {
                        [EUserAuthPass.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                        [EUserAuthPass.A_LOGIN]: 'admin',
                        [EUserAuthPass.A_PASSWORD_HASH]: hash1,
                    }, {
                        [EUserAuthPass.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                        [EUserAuthPass.A_LOGIN]: 'cust',
                        [EUserAuthPass.A_PASSWORD_HASH]: hash2,
                    },
                ]);
                await trx(EUserIdEmail.ENTITY).insert({
                    [EUserIdEmail.A_EMAIL]: 'flancer64@gmail.com',
                    [EUserIdEmail.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                });
                await trx(EUserIdPhone.ENTITY).insert({
                    [EUserIdPhone.A_PHONE]: '(371)29181801',
                    [EUserIdPhone.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                });
                const expiredAt = new Date();
                expiredAt.setUTCDate(expiredAt.getUTCDate() + 1);
                await trx(EUserRefLink.ENTITY).insert([{
                    [EUserRefLink.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EUserRefLink.A_CODE]: DEF.DATA_REF_CODE_ROOT,
                    [EUserRefLink.A_DATE_EXPIRED]: expiredAt,
                }, {
                    [EUserRefLink.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EUserRefLink.A_CODE]: DEF.DATA_REF_CODE_OTHER,
                    [EUserRefLink.A_DATE_EXPIRED]: expiredAt,
                }]);
                // users tree
                await trx(EUserRefTree.ENTITY).insert([
                    {
                        [EUserRefTree.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                        [EUserRefTree.A_PARENT_REF]: DEF.DATA_USER_ID_ADMIN,
                    }, {
                        [EUserRefTree.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                        [EUserRefTree.A_PARENT_REF]: DEF.DATA_USER_ID_ADMIN,
                    }
                ]);
            }

            async function insertWeightStats(trx) {
                await trx(EAppWeightStat.ENTITY).insert([{
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-01',
                    [EAppWeightStat.A_VALUE]: 92.3,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-02',
                    [EAppWeightStat.A_VALUE]: 91.5,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-03',
                    [EAppWeightStat.A_VALUE]: 92.2,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-04',
                    [EAppWeightStat.A_VALUE]: 92.0,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-06',
                    [EAppWeightStat.A_VALUE]: 92.3,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-07',
                    [EAppWeightStat.A_VALUE]: 91.8,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-09',
                    [EAppWeightStat.A_VALUE]: 90.9,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-12',
                    [EAppWeightStat.A_VALUE]: 92.0,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-13',
                    [EAppWeightStat.A_VALUE]: 91.4,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-14',
                    [EAppWeightStat.A_VALUE]: 91.7,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-15',
                    [EAppWeightStat.A_VALUE]: 91.4,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-23',
                    [EAppWeightStat.A_VALUE]: 91.5,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-07-28',
                    [EAppWeightStat.A_VALUE]: 91.1,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-03',
                    [EAppWeightStat.A_VALUE]: 91.3,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-05',
                    [EAppWeightStat.A_VALUE]: 92.1,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-06',
                    [EAppWeightStat.A_VALUE]: 92.1,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-10',
                    [EAppWeightStat.A_VALUE]: 92.1,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-11',
                    [EAppWeightStat.A_VALUE]: 91.8,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-12',
                    [EAppWeightStat.A_VALUE]: 92.6,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-18',
                    [EAppWeightStat.A_VALUE]: 93.2,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-22',
                    [EAppWeightStat.A_VALUE]: 91.7,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-26',
                    [EAppWeightStat.A_VALUE]: 91.5,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-08-27',
                    [EAppWeightStat.A_VALUE]: 91.3,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-09-2',
                    [EAppWeightStat.A_VALUE]: 90.9,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-09-09',
                    [EAppWeightStat.A_VALUE]: 90.9,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-09-16',
                    [EAppWeightStat.A_VALUE]: 90.3,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-09-23',
                    [EAppWeightStat.A_VALUE]: 89.8,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-09-30',
                    [EAppWeightStat.A_VALUE]: 89.7,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-10-07',
                    [EAppWeightStat.A_VALUE]: 89.6,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-10-14',
                    [EAppWeightStat.A_VALUE]: 90.1,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-10-21',
                    [EAppWeightStat.A_VALUE]: 91.0,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-10-28',
                    [EAppWeightStat.A_VALUE]: 90.5,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2020-11-04',
                    [EAppWeightStat.A_VALUE]: 90.5,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-01-26',
                    [EAppWeightStat.A_VALUE]: 96.0,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-01-30',
                    [EAppWeightStat.A_VALUE]: 94.4,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-02-01',
                    [EAppWeightStat.A_VALUE]: 94.8,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-02-10',
                    [EAppWeightStat.A_VALUE]: 94.5,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-02-17',
                    [EAppWeightStat.A_VALUE]: 94.8,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-02-21',
                    [EAppWeightStat.A_VALUE]: 95.6,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-02-22',
                    [EAppWeightStat.A_VALUE]: 95.3,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-02-23',
                    [EAppWeightStat.A_VALUE]: 95.1,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-02-25',
                    [EAppWeightStat.A_VALUE]: 94.4,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-03-02',
                    [EAppWeightStat.A_VALUE]: 94.6,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EAppWeightStat.A_DATE]: '2021-03-03',
                    [EAppWeightStat.A_VALUE]: 95,
                }]);
                await trx(EAppWeightStat.ENTITY).insert([{
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EAppWeightStat.A_DATE]: '2021-02-03',
                    [EAppWeightStat.A_VALUE]: 61.7,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EAppWeightStat.A_DATE]: '2021-02-10',
                    [EAppWeightStat.A_VALUE]: 61.4,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EAppWeightStat.A_DATE]: '2021-02-17',
                    [EAppWeightStat.A_VALUE]: 61.7,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EAppWeightStat.A_DATE]: '2021-02-24',
                    [EAppWeightStat.A_VALUE]: 62.5,
                }, {
                    [EAppWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EAppWeightStat.A_DATE]: '2021-03-03',
                    [EAppWeightStat.A_VALUE]: 61.3,
                }]);
            }

            // MAIN FUNCTIONALITY
            await insertUsers(trx);
            await insertSessions(trx);
            // await insertGroups(trx);
            // await insertGroupUsers(trx);
            await insertProfiles(trx);
            // await insertProfileGroupUsers(trx);
            await insertWeightStats(trx);
        }

        // MAIN FUNCTIONALITY
        const trx = await connector.startTransaction();
        try {
            // recreate DB structure
            await actRestruct();

            // perform queries to insert data into created tables
            await populateWithData(trx);
            // perform queries to insert data and commit changes
            trx.commit();
        } catch (e) {
            trx.rollback();
            logger.error(`${e.toString()}`);
        }
        await connector.disconnect();
    };

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const result = new DCommand();
    result.ns = DEF.BACK_REALM;
    result.name = 'db-reset';
    result.desc = 'Reset database structures and initialize test data.';
    result.action = action;
    return result;
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
