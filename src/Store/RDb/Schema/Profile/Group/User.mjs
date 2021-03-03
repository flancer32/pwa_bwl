/**
 *  Customize default data for users in groups.
 */
class Fl32_Bwl_Store_RDb_Schema_Profile_Group_User {

    static A_COLOR = 'color';  // Hex value for color in charts: 'FFFFFF'
    static A_GROUP_REF = 'group_ref';
    static A_GROUP_USER_REF = 'group_user_ref';
    static A_NICK = 'nick';
    static A_USER_REF = 'user_ref';
    static ENTITY = 'app_profile_group_user';

    /* Should we add fields to the class? 'obj.age' or 'obj[Clazz.A_AGE]'??? */
    color;
    group_ref;
    group_user_ref;
    nick;
    user_ref;
}

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Store_RDb_Schema_Profile_Group_User);

export default Fl32_Bwl_Store_RDb_Schema_Profile_Group_User;
