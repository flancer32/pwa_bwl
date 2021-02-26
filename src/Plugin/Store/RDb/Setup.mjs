export default class Fl32_Bwl_Plugin_Store_RDb_Setup {
    constructor(spec) {
        const {NameForForeignKey: utilFKName} = spec['TeqFw_Core_App_Util_Store_RDb'];
        /** @type {Fl32_Bwl_Store_RDb_Schema_Profile} */
        const eProfile = spec['Fl32_Bwl_Store_RDb_Schema_Profile$']; // instance singleton
        /** @type {Fl32_Teq_User_Store_RDb_Schema_User} */
        const eUser = spec['Fl32_Teq_User_Store_RDb_Schema_User$']; // instance singleton

        /**
         * TODO: tables drop should be ordered according to relations between tables (DEM).
         * For the moment I use levels for drop: N, ..., 2, 1, 0.
         *
         * @param schema
         */
        this.dropTables0 = function (schema) {

        };
        this.dropTables1 = function (schema) {
            /* drop related tables (foreign keys) */
            schema.dropTableIfExists(eProfile.ENTITY);
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
            function createTblProfile(builder, knex) {
                builder.createTable(eProfile.ENTITY, (table) => {
                    table.integer(eProfile.A_USER_REF).unsigned().notNullable().primary();
                    table.dateTime(eProfile.A_DATE_UPDATED).notNullable().defaultTo(knex.fn.now())
                        .comment('Date-time for the last update.');
                    table.integer(eProfile.A_AGE).unsigned().notNullable()
                        .comment('Full ages for the update moment.');
                    table.boolean(eProfile.A_GENDER).notNullable().defaultTo(true)
                        .comment('true - for women (XX).');
                    table.integer(eProfile.A_HEIGHT).unsigned().notNullable()
                        .comment('Height in cm.');
                    table.decimal(eProfile.A_WEIGHT_INIT, 4, 1).notNullable()
                        .comment('Initial weight.');
                    table.decimal(eProfile.A_WEIGHT_TARGET, 4, 1)
                        .comment('Target weight.');
                    table.foreign(eProfile.A_USER_REF).references(eUser.A_ID).inTable(eUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(utilFKName(eProfile.ENTITY, eProfile.A_USER_REF, eUser.ENTITY, eUser.A_ID));
                    table.comment('Application level profile (gender, height, ...).');
                });
            }

            // MAIN FUNCTIONALITY
            // compose queries to create main tables (registries)
            // compose queries to create main tables (registries)
            // compose queries to create additional tables (relations and details)
            createTblProfile(builder, knex);
        };
    }
}
