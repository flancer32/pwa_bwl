/**
 *  'app_profile' entity.
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Profile {
    age;
    date_updated;
    height;
    is_female;
    user_ref;
    weight_target;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Back_Store_RDb_Schema_Profile.A_AGE = 'age';
Fl32_Bwl_Back_Store_RDb_Schema_Profile.A_DATE_UPDATED = 'date_updated';
Fl32_Bwl_Back_Store_RDb_Schema_Profile.A_HEIGHT = 'height';
Fl32_Bwl_Back_Store_RDb_Schema_Profile.A_IS_FEMALE = 'is_female';
Fl32_Bwl_Back_Store_RDb_Schema_Profile.A_USER_REF = 'user_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Profile.A_WEIGHT_TARGET = 'weight_target';
Fl32_Bwl_Back_Store_RDb_Schema_Profile.ENTITY = 'app_profile';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Back_Store_RDb_Schema_Profile);
