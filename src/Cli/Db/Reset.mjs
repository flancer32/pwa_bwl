/**
 * @namespace Fl32_Bwl_Cli_Db_Reset
 */
// MODULE'S IMPORT
import $bcrypt from 'bcrypt';

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Cli_Db_Reset';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command to reset database structures and initialize test data.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @returns {TeqFw_Core_App_Cli_Command_Data}
 * @constructor
 * @memberOf Fl32_Bwl_Cli_Db_Reset
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];   // instance singleton
    /** @type {Fl32_Teq_User_Defaults} */
    const DEF_USER = spec['Fl32_Teq_User_Defaults$'];   // instance singleton
    /** @type {typeof TeqFw_Core_App_Cli_Command_Data} */
    const DCommand = spec['TeqFw_Core_App_Cli_Command#Data'];    // class constructor
    /** @type {TeqFw_Core_App_Db_Connector} */
    const connector = spec['TeqFw_Core_App_Db_Connector$']; // instance singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
    /** @type {Fl32_Teq_User_Plugin_Store_RDb_Setup} */
    const setupTeqUser = spec['Fl32_Teq_User_Plugin_Store_RDb_Setup$']; // instance singleton
    /** @type {Fl32_Bwl_Plugin_Store_RDb_Setup} */
    const setupApp = spec['Fl32_Bwl_Plugin_Store_RDb_Setup$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Auth_Password} */
    const eAuthPassword = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Password$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Auth_Session} */
    const eAuthSess = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Session$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Id_Email} */
    const eIdEmail = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Email$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Id_Phone} */
    const eIdPhone = spec['Fl32_Teq_User_Store_RDb_Schema_Id_Phone$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Profile} */
    const eProfile = spec['Fl32_Teq_User_Store_RDb_Schema_Profile$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Ref_Link} */
    const eRefLink = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Link$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_Ref_Tree} */
    const eRefTree = spec['Fl32_Teq_User_Store_RDb_Schema_Ref_Tree$']; // instance singleton
    /** @type {Fl32_Teq_User_Store_RDb_Schema_User} */
    const eUser = spec['Fl32_Teq_User_Store_RDb_Schema_User$']; // instance singleton
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Group} */
    const EGroup = spec['Fl32_Bwl_Store_RDb_Schema_Group#']; // class constructor
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Group_User} */
    const EGroupUser = spec['Fl32_Bwl_Store_RDb_Schema_Group_User#']; // class constructor
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
    const EProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile#']; // class constructor
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile_Group_User} */
    const EProfileGroupUser = spec['Fl32_Bwl_Store_RDb_Schema_Profile_Group_User#']; // class constructor
    /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Weight_Stat} */
    const EWeightStat = spec['Fl32_Bwl_Store_RDb_Schema_Weight_Stat#']; // class constructor

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
            async function insertGroups(trx) {
                const isPg = trx.client.constructor.name === 'Client_PG';
                await trx(EGroup.ENTITY).insert([{
                    [EGroup.A_ID]: isPg ? undefined : DEF.DATA_GROUP_ID_ADMIN,
                    [EGroup.A_ADMIN_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EGroup.A_DATE_CREATED]: '2021-02-01',
                    [EGroup.A_MODE]: DEF.DATA_SHARING_MODE_PERCENT,
                    [EGroup.A_NAME]: 'Percentage only',
                }, {
                    [EGroup.A_ID]: isPg ? undefined : DEF.DATA_GROUP_ID_CUST,
                    [EGroup.A_ADMIN_REF]: DEF.DATA_USER_ID_CUST,
                    [EGroup.A_DATE_CREATED]: '2021-02-01',
                    [EGroup.A_MODE]: DEF.DATA_SHARING_MODE_ALL,
                    [EGroup.A_NAME]: 'Sample',
                }]);
            }

            async function insertGroupUsers(trx) {
                await trx(EGroupUser.ENTITY).insert([{
                    [EGroupUser.A_GROUP_REF]: DEF.DATA_GROUP_ID_ADMIN,
                    [EGroupUser.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EGroupUser.A_ACTIVE]: true,
                    [EGroupUser.A_NICK]: 'alex',
                }, {
                    [EGroupUser.A_GROUP_REF]: DEF.DATA_GROUP_ID_ADMIN,
                    [EGroupUser.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EGroupUser.A_ACTIVE]: false,
                    [EGroupUser.A_NICK]: 'tanja',
                }, {
                    [EGroupUser.A_GROUP_REF]: DEF.DATA_GROUP_ID_CUST,
                    [EGroupUser.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EGroupUser.A_ACTIVE]: true,
                    [EGroupUser.A_NICK]: 'alex',
                }, {
                    [EGroupUser.A_GROUP_REF]: DEF.DATA_GROUP_ID_CUST,
                    [EGroupUser.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EGroupUser.A_ACTIVE]: true,
                    [EGroupUser.A_NICK]: 'tanja',
                }]);
            }

            async function insertProfiles(trx) {
                await trx(EProfile.ENTITY).insert([{
                    [EProfile.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EProfile.A_AGE]: 48,
                    [EProfile.A_HEIGHT]: 175,
                    [EProfile.A_IS_FEMALE]: false,
                    [EProfile.A_WEIGHT_INIT]: 95,
                    [EProfile.A_WEIGHT_TARGET]: 75,
                }, {
                    [EProfile.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EProfile.A_AGE]: 47,
                    [EProfile.A_HEIGHT]: 165,
                    [EProfile.A_IS_FEMALE]: true,
                    [EProfile.A_WEIGHT_INIT]: 61,
                    [EProfile.A_WEIGHT_TARGET]: 58,
                }]);
            }

            async function insertProfileGroupUsers(trx) {
                await trx(EProfileGroupUser.ENTITY).insert([{
                    [EProfileGroupUser.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EProfileGroupUser.A_GROUP_REF]: DEF.DATA_GROUP_ID_ADMIN,
                    [EProfileGroupUser.A_GROUP_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EProfileGroupUser.A_COLOR]: 65535,
                    [EProfileGroupUser.A_NICK]: 'Wife',
                }, {
                    [EProfileGroupUser.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EProfileGroupUser.A_GROUP_REF]: DEF.DATA_GROUP_ID_CUST,
                    [EProfileGroupUser.A_GROUP_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EProfileGroupUser.A_COLOR]: 65535,
                    [EProfileGroupUser.A_NICK]: 'Husband',
                }]);
            }

            async function insertSessions(trx) {
                await trx(eAuthSess.ENTITY).insert([{
                    [eAuthSess.A_SESSION_ID]: DEF.DATA_SESS_ID_ADMIN,
                    [eAuthSess.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                }, {
                    [eAuthSess.A_SESSION_ID]: DEF.DATA_SESS_ID_CUST,
                    [eAuthSess.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                }]);
            }

            async function insertUsers(trx) {
                const isPg = trx.client.constructor.name === 'Client_PG';
                await trx(eUser.ENTITY).insert([
                    {[eUser.A_ID]: isPg ? undefined : DEF.DATA_USER_ID_ADMIN},
                    {[eUser.A_ID]: isPg ? undefined : DEF.DATA_USER_ID_CUST},
                ]);
                await trx(eProfile.ENTITY).insert([
                    {[eProfile.A_USER_REF]: DEF.DATA_USER_ID_ADMIN, [eProfile.A_NAME]: 'Admin'},
                    {[eProfile.A_USER_REF]: DEF.DATA_USER_ID_CUST, [eProfile.A_NAME]: 'Customer'},
                ]);
                const hash1 = await $bcrypt.hash('test', DEF_USER.BCRYPT_HASH_ROUNDS);
                const hash2 = await $bcrypt.hash('test', DEF_USER.BCRYPT_HASH_ROUNDS);
                await trx(eAuthPassword.ENTITY).insert([
                    {
                        [eAuthPassword.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                        [eAuthPassword.A_LOGIN]: 'admin',
                        [eAuthPassword.A_PASSWORD_HASH]: hash1,
                    }, {
                        [eAuthPassword.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                        [eAuthPassword.A_LOGIN]: 'cust',
                        [eAuthPassword.A_PASSWORD_HASH]: hash2,
                    },
                ]);
                await trx(eIdEmail.ENTITY).insert({
                    [eIdEmail.A_EMAIL]: 'alex@wiredgeese.com',
                    [eIdEmail.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                });
                await trx(eIdPhone.ENTITY).insert({
                    [eIdPhone.A_PHONE]: '(371)29181801',
                    [eIdPhone.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                });
                await trx(eRefLink.ENTITY).insert([{
                    [eRefLink.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [eRefLink.A_CODE]: DEF.DATA_REF_CODE_ROOT,
                }, {
                    [eRefLink.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [eRefLink.A_CODE]: DEF.DATA_REF_CODE_OTHER,
                }]);
                // users tree
                await trx(eRefTree.ENTITY).insert([
                    {
                        [eRefTree.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                        [eRefTree.A_PARENT_REF]: DEF.DATA_USER_ID_ADMIN,
                    }, {
                        [eRefTree.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                        [eRefTree.A_PARENT_REF]: DEF.DATA_USER_ID_ADMIN,
                    }
                ]);
            }

            async function insertWeightStats(trx) {
                await trx(EWeightStat.ENTITY).insert([{
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-02-01',
                    [EWeightStat.A_VALUE]: 94.8,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-02-10',
                    [EWeightStat.A_VALUE]: 94.5,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-02-17',
                    [EWeightStat.A_VALUE]: 94.8,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-02-21',
                    [EWeightStat.A_VALUE]: 95.6,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-02-22',
                    [EWeightStat.A_VALUE]: 95.3,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-02-23',
                    [EWeightStat.A_VALUE]: 95.1,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-02-25',
                    [EWeightStat.A_VALUE]: 94.4,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-03-02',
                    [EWeightStat.A_VALUE]: 94.6,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                    [EWeightStat.A_DATE]: '2021-03-03',
                    [EWeightStat.A_VALUE]: 95,
                }]);
                await trx(EWeightStat.ENTITY).insert([{
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EWeightStat.A_DATE]: '2021-02-03',
                    [EWeightStat.A_VALUE]: 61.7,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EWeightStat.A_DATE]: '2021-02-10',
                    [EWeightStat.A_VALUE]: 61.4,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EWeightStat.A_DATE]: '2021-02-17',
                    [EWeightStat.A_VALUE]: 61.7,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EWeightStat.A_DATE]: '2021-02-24',
                    [EWeightStat.A_VALUE]: 62.5,
                }, {
                    [EWeightStat.A_USER_REF]: DEF.DATA_USER_ID_CUST,
                    [EWeightStat.A_DATE]: '2021-03-03',
                    [EWeightStat.A_VALUE]: 61.3,
                }]);
            }

            // MAIN FUNCTIONALITY
            await insertUsers(trx);
            await insertSessions(trx);
            await insertGroups(trx);
            await insertGroupUsers(trx);
            await insertProfiles(trx);
            await insertProfileGroupUsers(trx);
            await insertWeightStats(trx);
        }

        // MAIN FUNCTIONALITY
        const knex = await connector.getKnex();
        const trx = await connector.startTransaction();
        try {
            // compose queries to recreate DB structure
            /** @type {SchemaBuilder} */
            const builder = connector.getSchema();

            // drop tables considering relations (1) then drop base registries (0)
            // (1)
            setupApp.dropTables1(builder);
            setupTeqUser.dropTables1(builder);
            // (0)
            setupApp.dropTables0(builder);
            setupTeqUser.dropTables0(builder);
            // create tables
            setupTeqUser.createStructure(knex, builder);
            setupApp.createStructure(knex, builder);
            // perform queries to recreate DB structure
            await builder;

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
