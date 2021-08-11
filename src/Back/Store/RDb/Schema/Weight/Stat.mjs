/**
 *  'app_weight_stat' entity
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat {
    date;
    type;
    user_ref;
    value;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.A_DATE = 'date';
Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.A_TYPE = 'type';
Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.A_USER_REF = 'user_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.A_VALUE = 'value';
Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.DATA_TYPE_CURRENT = 'c';
Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.DATA_TYPE_TARGET = 't';
Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat.ENTITY = 'app_weight_stat';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Back_Store_RDb_Schema_Weight_Stat);
