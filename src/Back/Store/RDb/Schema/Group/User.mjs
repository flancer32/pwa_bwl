/**
 * 'app_group_user' entity.
 *  Many-to-many relation between Group and User entities.
 */
class Fl32_Bwl_Back_Store_RDb_Schema_Group_User {
    active;
    date_joined;
    group_ref;
    nick;
    user_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Back_Store_RDb_Schema_Group_User.A_ACTIVE = 'active';
Fl32_Bwl_Back_Store_RDb_Schema_Group_User.A_DATE_JOINED = 'date_joined';
Fl32_Bwl_Back_Store_RDb_Schema_Group_User.A_GROUP_REF = 'group_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Group_User.A_NICK = 'nick'; // nickname for the user inside the group
Fl32_Bwl_Back_Store_RDb_Schema_Group_User.A_USER_REF = 'user_ref';
Fl32_Bwl_Back_Store_RDb_Schema_Group_User.ENTITY = 'app_group_user';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Back_Store_RDb_Schema_Group_User);

// MODULE'S EXPORT
export default Fl32_Bwl_Back_Store_RDb_Schema_Group_User;
