/**
 *  Many-to-many relation between Group and User entities.
 */
class Fl32_Bwl_Store_RDb_Schema_Group_User {

    static A_ACTIVE = 'active';
    static A_DATE_JOINED = 'date_joined';
    static A_GROUP_REF = 'group_ref';
    static A_NICK = 'nick'; // nickname for the user inside the group
    static A_USER_REF = 'user_ref';
    static ENTITY = 'app_group_user';

    /* Should we add fields to the class? 'obj.age' or 'obj[Clazz.A_AGE]'??? */
    active;
    date_joined;
    group_ref;
    nick;
    user_ref;
}

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Store_RDb_Schema_Group_User);

export default Fl32_Bwl_Store_RDb_Schema_Group_User;
