/**
 *  'app_weight_stat' entity
 */
class Fl32_Bwl_Store_RDb_Schema_Weight_Stat {
    date;
    user_ref;
    value;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Store_RDb_Schema_Weight_Stat.A_DATE = 'date';
Fl32_Bwl_Store_RDb_Schema_Weight_Stat.A_USER_REF = 'user_ref';
Fl32_Bwl_Store_RDb_Schema_Weight_Stat.A_VALUE = 'value';
Fl32_Bwl_Store_RDb_Schema_Weight_Stat.ENTITY = 'app_weight_stat';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Store_RDb_Schema_Weight_Stat);

// MODULE'S EXPORT
export default Fl32_Bwl_Store_RDb_Schema_Weight_Stat;
