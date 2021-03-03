/**
 *  Group entity.
 */
class Fl32_Bwl_Store_RDb_Schema_Group {

    static A_ADMIN_REF = 'admin_ref';
    static A_DATE_CREATED = 'date_created';
    static A_ID = 'id';
    static A_MODE = 'mode'; // info sharing mode: all, relative only
    static A_NAME = 'name';
    static ENTITY = 'app_group';

    /* Should we add fields to the class? 'obj.age' or 'obj[Clazz.A_AGE]'??? */
    admin_ref;
    date_created;
    id;
    mode;
    name;
}

// freeze class to deny attributes changes
Object.freeze(Fl32_Bwl_Store_RDb_Schema_Group);

export default Fl32_Bwl_Store_RDb_Schema_Group;
