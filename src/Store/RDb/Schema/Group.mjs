/**
 *  'app_group' entity.
 *  @deprecated use 'app_friend' entity
 */
class Fl32_Bwl_Store_RDb_Schema_Group {
    admin_ref;
    date_created;
    id;
    mode;
    name;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Bwl_Store_RDb_Schema_Group.A_ADMIN_REF = 'admin_ref';
Fl32_Bwl_Store_RDb_Schema_Group.A_DATE_CREATED = 'date_created';
Fl32_Bwl_Store_RDb_Schema_Group.A_ID = 'id';
Fl32_Bwl_Store_RDb_Schema_Group.A_MODE = 'mode'; // info sharing mode: all, relative only
Fl32_Bwl_Store_RDb_Schema_Group.A_NAME = 'name';
Fl32_Bwl_Store_RDb_Schema_Group.ENTITY = 'app_group';

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Store_RDb_Schema_Group);

// MODULE'S EXPORT
export default Fl32_Bwl_Store_RDb_Schema_Group;
