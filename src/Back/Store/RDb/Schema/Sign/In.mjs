/**
 *  'app_sign_in' entity: registry for one-time sign in codes with limited life time.
 */
export default class Fl32_Bwl_Back_Store_RDb_Schema_Sign_In {
    code;
    date_expired;
    user_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.A_CODE = 'code';
Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.A_DATE_EXPIRED = 'date_expired';
Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.A_USER_REF = 'user_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Sign_In.ENTITY = 'app_sign_in';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Back_Store_RDb_Schema_Sign_In);
