import $bcrypt from 'bcrypt';

/**
 * Factory class to create CLI command to reset database structures and initialize test data.
 */
export default class Fl32_Bwl_Cli_Db_Reset {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
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
        const eAuthPassword = spec['Fl32_Teq_User_Store_RDb_Schema_Auth_Password$'];
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

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * @see TeqFw_Core_App_Cli_Command.create
         * @return {Promise<TeqFw_Core_App_Cli_Command_Data>}
         */
        this.create = async function () {
            // this is sample code:
            const result = new DCommand();
            result.ns = DEF.BACK_REALM;
            result.name = 'db-reset';
            result.desc = 'Reset database structures and initialize test data.';
            result.action = async function () {
                // DEFINE INNER FUNCTIONS

                /**
                 * Compose queries to insert data into the tables.
                 * @param trx
                 */
                async function populateWithData(trx) {
                    // DEFINE INNER FUNCTIONS
                    async function insertUsers(trx) {
                        await trx(eUser.ENTITY).insert([
                            {[eUser.A_ID]: DEF.DATA_USER_ID_ADMIN},
                            {[eUser.A_ID]: DEF.DATA_USER_ID_CUST},
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
                        await trx(eRefLink.ENTITY).insert({
                            [eRefLink.A_USER_REF]: DEF.DATA_USER_ID_ADMIN,
                            [eRefLink.A_CODE]: DEF.DATA_REF_CODE_ROOT,
                        });
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

                    // MAIN FUNCTIONALITY
                    await insertUsers(trx);
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
            return result;
        };
    }
}
