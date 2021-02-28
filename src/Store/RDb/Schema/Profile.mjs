/**
 *  'app_profile' entity attributes (table and columns names)
 */
export default class Fl32_Bwl_Store_RDb_Schema_Profile {

    static A_AGE = 'age';
    static A_DATE_UPDATED = 'date_updated';
    static A_HEIGHT = 'height';
    static A_IS_FEMALE = 'is_female';
    static A_USER_REF = 'user_ref';
    static A_WEIGHT_INIT = 'weight_init';
    static A_WEIGHT_TARGET = 'weight_target';
    static ENTITY = 'app_profile';

    /* Should we add fields to the class? 'obj.age' or 'obj[Clazz.A_AGE]'??? */
    age;
    date_updated;
    height;
    is_female;
    user_ref;
    weight_init;
    weight_target;
}

Object.freeze(Fl32_Bwl_Store_RDb_Schema_Profile);
