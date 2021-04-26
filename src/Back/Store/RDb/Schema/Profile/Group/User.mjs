/**
 * 'app_profile_group_user' entity.
 * Customize default data for users in groups.
 */
class Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User {
    color;
    group_ref;
    group_user_ref;
    nick;
    user_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User.A_COLOR = 'color';  // Hex value for color in charts: 'FFFFFF'
Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User.A_GROUP_REF = 'group_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User.A_GROUP_USER_REF = 'group_user_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User.A_NICK = 'nick';
Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User.A_USER_REF = 'user_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User.ENTITY = 'app_profile_group_user';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User);

// MODULE'S EXPORT
export default Fl32_Bwl_Back_Store_RDb_Schema_Profile_Group_User;
