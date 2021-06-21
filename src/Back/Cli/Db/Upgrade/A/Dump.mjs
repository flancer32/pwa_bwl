/**
 * Action to dump all DB data.
 *
 * @namespace Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Core_App_Db_Connector} */
    const connector = spec['TeqFw_Core_App_Db_Connector$']; // singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // singleton
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend} */
    const EAppFriend = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend#']; // class
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
    const EAppFriendLink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link#']; // class
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
    const EAppProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#']; // class
    /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
    const EAppSignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In#']; // class
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
     * Action to dump all DB data.
     * @returns {Promise<null|Object>}
     * @memberOf Fl32_Bwl_Back_Cli_Db_Upgrade_A_Dump
     */
    async function action() {
        // DEFINE INNER FUNCTIONS
        /**
         * Get nextval for Postgres serial.
         * @param schema
         * @param {String[]} serials
         * @returns {Promise<Object>}
         */
        async function getSerials(schema, serials) {
            const result = {};
            for (const one of serials) {
                schema.raw(`SELECT nextval('${one}')`);
            }
            const rs = await schema;
            for (const i in rs) {
                const key = serials[i];
                result[key] = rs[i].rows[0].nextval;
            }
            return result;
        }

        async function getTables(trx) {
            const result = [];
            const dialect = trx.client.config.client;
            if (['mysql', 'mysql2'].includes(dialect)) {
                const rs = await trx.raw('show tables');
                if (Array.isArray(rs)) {
                    const column = rs[1][0]['name'];
                    rs[0].map(one => result.push(one[column]));
                }
            } else if (['pg'].includes(dialect)) {
                const rs = await trx.raw('SELECT * FROM information_schema.tables  WHERE table_schema = \'public\'');
                if (Array.isArray(rs?.rows)) {
                    rs.rows.map(one => result.push(one['table_name']));
                }
            } else {
                throw new Error(`This dialect (${dialect}) is not supported.`);
            }
            return result;
        }

        /**
         *
         * @param trx
         * @param {String[]} tables
         * @param {String} entity
         * @returns {Promise<*|null>}
         */
        async function selectItems(trx, tables, entity) {
            if (tables.includes(entity)) {
                return await trx.select().from(entity);
            } else {
                return null;
            }
        }

        // MAIN FUNCTIONALITY
        const trx = await connector.startTransaction();
        try {
            const result = {};
            const tables = await getTables(trx);
            // app data
            result[EAppFriend.ENTITY] = await selectItems(trx, tables, EAppFriend.ENTITY);
            result[EAppFriendLink.ENTITY] = await selectItems(trx, tables, EAppFriendLink.ENTITY);
            result[EAppProfile.ENTITY] = await selectItems(trx, tables, EAppProfile.ENTITY);
            result[EAppSignIn.ENTITY] = await selectItems(trx, tables, EAppSignIn.ENTITY);
            result[EAppWeightStat.ENTITY] = await selectItems(trx, tables, EAppWeightStat.ENTITY);
            // users data
            result[EUser.ENTITY] = await selectItems(trx, tables, EUser.ENTITY);
            result[EUserAuthPass.ENTITY] = await selectItems(trx, tables, EUserAuthPass.ENTITY);
            result[EUserAuthSess.ENTITY] = await selectItems(trx, tables, EUserAuthSess.ENTITY);
            result[EUserIdEmail.ENTITY] = await selectItems(trx, tables, EUserIdEmail.ENTITY);
            result[EUserIdPhone.ENTITY] = await selectItems(trx, tables, EUserIdPhone.ENTITY);
            result[EUserProfile.ENTITY] = await selectItems(trx, tables, EUserProfile.ENTITY);
            result[EUserRefLink.ENTITY] = await selectItems(trx, tables, EUserRefLink.ENTITY);
            result[EUserRefTree.ENTITY] = await selectItems(trx, tables, EUserRefTree.ENTITY);
            // serials for Postgres
            const isPg = trx.client.constructor.name === 'Client_PG';
            if (isPg) {
                const knex = await connector.getKnex();
                const schema = knex.schema;
                const userId = `${EUser.ENTITY}_id_seq`;
                result.serials = await getSerials(schema, [userId, groupId]);
            }
            // perform queries to insert data and commit changes
            trx.commit();
            logger.info('All data is dumped.');
            return result;
        } catch (e) {
            trx.rollback();
            logger.error(`${e.toString()}`);
            return null;
        }
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    return action;
}


// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
