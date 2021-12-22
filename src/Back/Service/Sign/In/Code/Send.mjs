/**
 * Send one-time sign-in code to email.
 *
 * @namespace Fl32_Bwl_Back_Service_Sign_In_Code_Send
 */
// MODULE'S VARS
const NS = 'Fl32_Bwl_Back_Service_Sign_In_Code_Send';

/**
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class Fl32_Bwl_Back_Service_Sign_In_Code_Send {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Factory} */
        const route = spec['Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send#Factory$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {Fl32_Bwl_Back_Process_Sign_In_Code_Create.process|function} */
        const procCreate = spec['Fl32_Bwl_Back_Process_Sign_In_Code_Create$'];
        /** @type {Fl32_Bwl_Back_Process_Sign_In_Code_CleanUp.process|function} */
        const procCleanUp = spec['Fl32_Bwl_Back_Process_Sign_In_Code_CleanUp$'];
        /** @type {Fl32_Bwl_Back_Process_Sign_In_Code_Email.process|function} */
        const procEmail = spec['Fl32_Bwl_Back_Process_Sign_In_Code_Email$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_WAPI_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Request} */
                const req = context.getInData();
                /** @type {Fl32_Bwl_Shared_Service_Route_Sign_In_Code_Send.Response} */
                const res = context.getOutData();
                res.isSent = false;
                const trx = await conn.startTransaction();
                try {
                    const email = req.email;
                    await procCleanUp({trx: trx});
                    const code = await procCreate({trx, email});
                    if (code !== null) res.isSent = await procEmail({to: email, code});
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
