/**
 * Email sign in code to user.
 *
 * @namespace Fl32_Bwl_Back_Process_Sign_In_Code_Email
 */
// MODULE'S IMPORT
import nodemailer from 'nodemailer';

// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Process_Sign_In_Code_Email';

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the processor.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructs Fl32_Bwl_Back_Process_Sign_In_Code_Email.process
 * @memberOf Fl32_Bwl_Back_Process_Sign_In_Code_Email
 */
function Factory(spec) {
    /** @type {Fl32_Bwl_Defaults} */
    const DEF = spec['Fl32_Bwl_Defaults$'];    // instance singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
    /** @type {TeqFw_Core_App_Front_Data_Config} */
    const config = spec[DEF.MOD_CORE.DI_CONFIG]; // named singleton

    /**
     * Email sign in code to user.
     *
     * @param {String} to
     * @param {String} code
     * @returns {Promise<boolean>}
     * @memberOf Fl32_Bwl_Back_Process_Sign_In_Code_Email
     */
    async function process({to, code}) {
        let result = false;
        // get config for SMTP transport
        const cfg = config?.local?.email;
        const urlBase = config.local.web.urlBase;
        const url = `https://${urlBase}/pub/#/sign/in/${code}`;
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport(cfg);
        const from = `"BWL Mailer" <${cfg.auth.user}>`;
        const subject = 'BWL login link';
        const text = `BWL sign in link: ${url}`;
        const html = `<a href="${url}">Sign in to BWL</a>`;
        // send mail with defined transport object
        const info = await transporter.sendMail({from, to, subject, text, html});
        if (info.messageId) {
            result = true;
            logger.info(`Login code is sent to '${to}'. Message ID: ${info.messageId}.`);
        }
        return result;
    }

    Object.defineProperty(process, 'name', {value: `${NS}.${process.name}`});
    return process;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
