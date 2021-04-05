export default class Fl32_Bwl_Plugin_Store_RDb_Setup {
    constructor(spec) {
        /** @type {Fl32_Bwl_Defaults} */
        const DEF = spec['Fl32_Bwl_Defaults$']; // instance singleton
        const {NameForForeignKey: utilFKName} = spec['TeqFw_Core_App_Util_Store_RDb'];
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Group} */
        const EGroup = spec['Fl32_Bwl_Store_RDb_Schema_Group#']; // class constructor
        // /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Group_User} */
        const EGroupUser = spec['Fl32_Bwl_Store_RDb_Schema_Group_User#']; // class constructor
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile#']; // class constructor
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Profile_Group_User} */
        const EProfileGroupUser = spec['Fl32_Bwl_Store_RDb_Schema_Profile_Group_User#']; // class constructor
        /** @type {typeof Fl32_Bwl_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Store_RDb_Schema_Weight_Stat#']; // class constructor
        /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_User} */
        const EUser = spec['Fl32_Teq_User_Store_RDb_Schema_User#']; // class constructor

        /**
         * TODO: tables drop should be ordered according to relations between tables (DEM).
         * For the moment I use levels for drop: N, ..., 2, 1, 0.
         *
         * @param schema
         */
        this.dropTables0 = function (schema) {
            schema.dropTableIfExists(EGroup.ENTITY);
        };
        this.dropTables1 = function (schema) {
            /* drop related tables (foreign keys) */
            schema.dropTableIfExists(EGroupUser.ENTITY);
            schema.dropTableIfExists(EProfile.ENTITY);
            schema.dropTableIfExists(EProfileGroupUser.ENTITY);
            schema.dropTableIfExists(EWeightStat.ENTITY);
        };

        /**
         * Upgrade database structure (drop/create tables).
         *
         * @param knex
         * @param {SchemaBuilder} builder
         */
        this.createStructure = function (knex, builder) {

            // DEFINE INNER FUNCTIONS

            /**
             * @param {SchemaBuilder} builder
             * @param knex
             */
            function createTblGroup(builder, knex) {
                builder.createTable(EGroup.ENTITY, (table) => {
                    table.increments(EGroup.A_ID).unsigned().notNullable();
                    table.dateTime(EGroup.A_DATE_CREATED).notNullable().defaultTo(knex.fn.now());
                    table.integer(EGroup.A_ADMIN_REF).unsigned().notNullable()
                        .comment('Reference to admin user.');
                    table.string(EGroup.A_NAME).notNullable();
                    table.enu(EGroup.A_MODE, [
                        DEF.DATA_SHARING_MODE_ALL,
                        DEF.DATA_SHARING_MODE_PERCENT
                    ]).notNullable().comment('Sharing mode for group users: (a)ll, (p)ersentage');
                    table.foreign(EGroup.A_ADMIN_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(EGroup.ENTITY, EGroup.A_ADMIN_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('Registry for users groups to share weight info.');
                });
            }

            /**
             * @param {SchemaBuilder} builder
             * @param knex
             */
            function createTblGroupUser(builder, knex) {
                builder.createTable(EGroupUser.ENTITY, (table) => {
                    table.integer(EGroupUser.A_GROUP_REF).unsigned().notNullable()
                        .comment('Group ID');
                    table.integer(EGroupUser.A_USER_REF).unsigned().notNullable()
                        .comment('Group member ID');
                    table.string(EGroupUser.A_NICK).notNullable()
                        .comment('Default nickname for the member in the group.');
                    table.dateTime(EGroupUser.A_DATE_JOINED).notNullable().defaultTo(knex.fn.now())
                        .comment('Date when the user has been joined to the group.');
                    table.boolean(EGroupUser.A_ACTIVE).notNullable().defaultTo(false)
                        .comment('true - member has approved info sharing.');
                    table.primary([EGroupUser.A_GROUP_REF, EGroupUser.A_USER_REF]);
                    table.foreign(EGroupUser.A_GROUP_REF).references(EGroup.A_ID).inTable(EGroup.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(EGroupUser.ENTITY, EGroupUser.A_GROUP_REF, EGroup.ENTITY, EGroup.A_ID));
                    table.foreign(EGroupUser.A_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(EGroupUser.ENTITY, EGroupUser.A_USER_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('Relations between groups and users.');
                });
            }

            /**
             * @param {SchemaBuilder} builder
             * @param knex
             */
            function createTblProfile(builder, knex) {
                builder.createTable(EProfile.ENTITY, (table) => {
                    table.integer(EProfile.A_USER_REF).unsigned().notNullable().primary();
                    table.dateTime(EProfile.A_DATE_UPDATED).notNullable().defaultTo(knex.fn.now())
                        .comment('Date-time for the last update.');
                    table.integer(EProfile.A_AGE).unsigned().notNullable()
                        .comment('Full ages for the update moment.');
                    table.boolean(EProfile.A_IS_FEMALE).notNullable().defaultTo(true)
                        .comment('true - for women (XX).');
                    table.integer(EProfile.A_HEIGHT).unsigned().notNullable()
                        .comment('Height in cm.');
                    table.decimal(EProfile.A_WEIGHT_INIT, 4, 1).notNullable()
                        .comment('Initial weight.');
                    table.decimal(EProfile.A_WEIGHT_TARGET, 4, 1)
                        .comment('Target weight.');
                    table.foreign(EProfile.A_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(EProfile.ENTITY, EProfile.A_USER_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('Application level profile (gender, height, ...).');
                });
            }

            /**
             * @param {SchemaBuilder} builder
             * @param knex
             */
            function createTblProfileGroupUser(builder, knex) {
                builder.createTable(EProfileGroupUser.ENTITY, (table) => {
                    table.integer(EProfileGroupUser.A_USER_REF).unsigned().notNullable()
                        .comment('Reference to the owner of the profile.');
                    table.integer(EProfileGroupUser.A_GROUP_REF).unsigned().notNullable()
                        .comment('Reference to the group to overwrite link defaults.');
                    table.integer(EProfileGroupUser.A_GROUP_USER_REF).unsigned().notNullable()
                        .comment('Reference to the user in group to overwrite link defaults.');
                    table.integer(EProfileGroupUser.A_COLOR).unsigned()
                        .comment('Color code (FFFFFF) as an integer to overwrite default color for the link in charts.');
                    table.string(EProfileGroupUser.A_NICK)
                        .comment('Overwrite default nick for the user in the group set by admin.');
                    table.primary([
                        EProfileGroupUser.A_USER_REF,
                        EProfileGroupUser.A_GROUP_REF,
                        EProfileGroupUser.A_GROUP_USER_REF,
                    ]);
                    table.foreign(EProfileGroupUser.A_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(
                            EProfileGroupUser.ENTITY, EProfileGroupUser.A_USER_REF, EUser.ENTITY, EUser.A_ID)
                        );
                    table.foreign(EProfileGroupUser.A_GROUP_REF).references(EGroup.A_ID).inTable(EGroup.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(
                            EProfileGroupUser.ENTITY, EProfileGroupUser.A_GROUP_REF, EGroup.ENTITY, EGroup.A_ID)
                        );
                    table.foreign(EProfileGroupUser.A_GROUP_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(
                            EProfileGroupUser.ENTITY, EProfileGroupUser.A_GROUP_USER_REF, EUser.ENTITY, EUser.A_ID)
                        );
                    table.comment('Personal overwrites for member-group links.');
                });
            }

            /**
             * @param {SchemaBuilder} builder
             * @param knex
             */
            function createTblWeightStat(builder, knex) {
                builder.createTable(EWeightStat.ENTITY, (table) => {
                    table.integer(EWeightStat.A_USER_REF).unsigned().notNullable();
                    table.date(EWeightStat.A_DATE).notNullable().defaultTo(knex.fn.now())
                        .comment('Date-time for the value.');
                    table.decimal(EWeightStat.A_VALUE, 4, 1).notNullable()
                        .comment('Statistical value for the weight in kg: 75.4.');
                    table.primary([EWeightStat.A_USER_REF, EWeightStat.A_DATE]);
                    table.foreign(EWeightStat.A_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(EWeightStat.ENTITY, EWeightStat.A_USER_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('Weight values by date (kg).');
                });
            }

            // MAIN FUNCTIONALITY
            // compose queries to create main tables (registries)
            createTblGroup(builder, knex);
            // compose queries to create additional tables (relations and details)
            createTblGroupUser(builder, knex);
            createTblProfile(builder, knex);
            createTblProfileGroupUser(builder, knex);
            createTblWeightStat(builder, knex);
        };
    }
}
