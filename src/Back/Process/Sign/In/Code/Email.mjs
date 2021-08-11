/**
 * Email sign in code to user.
 *
 * @namespace Fl32_Bwl_Back_Process_Sign_In_Code_Email
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Sign_In_Code_Email';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Sign_In_Code_Email.process
 * @memberOf Fl32_Bwl_Back_Process_Sign_In_Code_Email
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Back_Defaults} */
    const DEF = spec['Fl32_Bwl_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {Function|TeqFw_Email_Back_Process_Email.process} */
    const procEmail = spec['TeqFw_Email_Back_Process_Email$'];

    /**
     * Email sign in code to user.
     *
     * @param {String} to
     * @param {String} code
     * @returns {Promise<boolean>}
     * @memberOf Fl32_Bwl_Back_Process_Sign_In_Code_Email
     */
    async function process({to, code}) {
        const urlBase = config.getLocal()?.web.urlBase;
        const realm = DEF.SHARED.DOOR_PUB;
        const route = DEF.SHARED.DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK.replace(':code', code);
        const url = `https://${urlBase}/${realm}/#${route}`;
        const subject = 'BWL login link';
        const text = `BWL sign in link: ${url}`;
        const html = `<a href="${url}">Sign in to BWL</a>`;
        // send mail with defined transport object
        return await procEmail({to, subject, text, html});
    }

    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
