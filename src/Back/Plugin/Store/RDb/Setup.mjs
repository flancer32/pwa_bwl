export default class Fl32_Bwl_Back_Plugin_Store_RDb_Setup {
    constructor(spec) {
        /** @function {@type TeqFw_Db_Back_Util.nameFK} */
        const nameFK = spec['TeqFw_Db_Back_Util#nameFK'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend} */
        const EFriend = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend#'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link} */
        const EFriendLink = spec['Fl32_Bwl_Back_Store_RDb_Schema_Friend_Link#'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Profile} */
        const EProfile = spec['Fl32_Bwl_Back_Store_RDb_Schema_Profile#'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Sign_In} */
        const ESignIn = spec['Fl32_Bwl_Back_Store_RDb_Schema_Sign_In#'];
        /** @type {typeof Fl32_Teq_User_Store_RDb_Schema_User} */
        const EUser = spec['Fl32_Teq_User_Store_RDb_Schema_User#'];
        /** @type {typeof Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat} */
        const EWeightStat = spec['Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat#'];
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
            schema.dropTableIfExists(EFriend.ENTITY);
            schema.dropTableIfExists(EFriendLink.ENTITY);
            schema.dropTableIfExists(EProfile.ENTITY);
            schema.dropTableIfExists(ESignIn.ENTITY);
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
            function createTblFriend(builder, knex) {
                builder.createTable(EFriend.ENTITY, (table) => {
                    table.integer(EFriend.A_LEADER_REF).unsigned().notNullable()
                        .comment('Reference to user who has started relation.');
                    table.integer(EFriend.A_WINGMAN_REF).unsigned().notNullable()
                        .comment('Reference to user who has accepted relation.');
                    table.dateTime(EFriend.A_DATE_STARTED).notNullable().defaultTo(knex.fn.now());
                    table.primary([EFriend.A_LEADER_REF, EFriend.A_WINGMAN_REF]);
                    table.foreign(EFriend.A_LEADER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(EFriend.ENTITY, EFriend.A_LEADER_REF, EUser.ENTITY, EUser.A_ID));
                    table.foreign(EFriend.A_WINGMAN_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(EFriend.ENTITY, EFriend.A_WINGMAN_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('Friendship relations between users.');
                });
            }

            /**
             * @param {SchemaBuilder} builder
             * @param knex
             */
            function createTblFriendLink(builder, knex) {
                builder.createTable(EFriendLink.ENTITY, (table) => {
                    table.string(EFriendLink.A_CODE).notNullable().primary()
                        .comment('Code for link to establish friendship relations.');
                    table.integer(EFriendLink.A_LEADER_REF).unsigned().notNullable();
                    table.dateTime(EFriendLink.A_DATE_EXPIRED).notNullable()
                        .comment('Date-time for link code expiration.');
                    table.foreign(EFriendLink.A_LEADER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(EFriendLink.ENTITY, EFriendLink.A_LEADER_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('One-time friendship relations codes with limited lifetime.');
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
                    table.foreign(EProfile.A_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(EProfile.ENTITY, EProfile.A_USER_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('Application level profile (gender, height, ...).');
                });
            }

            /**
             * @param {SchemaBuilder} builder
             * @param knex
             */
            function createTblSignIn(builder, knex) {
                builder.createTable(ESignIn.ENTITY, (table) => {
                    table.string(ESignIn.A_CODE).notNullable().primary()
                        .comment('Referral link code.');
                    table.integer(ESignIn.A_USER_REF).unsigned().notNullable();
                    table.dateTime(ESignIn.A_DATE_EXPIRED).notNullable()
                        .comment('Date-time for referral code expiration.');
                    table.foreign(ESignIn.A_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(ESignIn.ENTITY, ESignIn.A_USER_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('One-time sign in codes with limited lifetime.');
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
                    table.enum(EWeightStat.A_TYPE, [
                        EWeightStat.DATA_TYPE_CURRENT,
                        EWeightStat.DATA_TYPE_TARGET]
                    ).notNullable().defaultTo(EWeightStat.DATA_TYPE_CURRENT)
                        .comment('Weight type: current or target');
                    table.decimal(EWeightStat.A_VALUE, 4, 1).notNullable()
                        .comment('Statistical value for the weight in kg: 75.4.');
                    table.primary([EWeightStat.A_USER_REF, EWeightStat.A_DATE, EWeightStat.A_TYPE]);
                    table.foreign(EWeightStat.A_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(EWeightStat.ENTITY, EWeightStat.A_USER_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('Weight values by date (kg).');
                });
            }

            // MAIN FUNCTIONALITY
            // compose queries to create main tables (registries)

            // compose queries to create additional tables (relations and details)
            createTblFriend(builder, knex);
            createTblFriendLink(builder, knex);
            createTblProfile(builder, knex);
            createTblSignIn(builder, knex);
            createTblWeightStat(builder, knex);
        };
    }
}
