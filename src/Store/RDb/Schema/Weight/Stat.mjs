/**
 *  'app_profile' entity attributes (table and columns names)
 */
export default class Fl32_Bwl_Store_RDb_Schema_Weight_Stat {

    static A_DATE = 'date';
    static A_USER_REF = 'user_ref';
    static A_VALUE = 'value';
    static ENTITY = 'app_weight_stat';

    /* Should we add fields to the class? 'obj.age' or 'obj[Clazz.A_AGE]'??? */
    date;
    user_ref;
    value;
}

Object.freeze(Fl32_Bwl_Store_RDb_Schema_Weight_Stat);
