import assert from 'assert';
import {describe, it} from 'mocha';
import devEnv from '../../../../../../../dev/manual/DevEnv.mjs';

/**
 * This is environment for code development, not for testing.
 */
describe('Fl32_Bwl_Back_Process_Sign_In_Code_Email', () => {

    it('performs the duties', async () => {
        /** @type {TeqFw_Di_Container} */
        const container = await devEnv();
        /** @function {@type Fl32_Bwl_Back_Process_Sign_In_Code_Email.process} */
        const proc = await container.get('Fl32_Bwl_Back_Process_Sign_In_Code_Email$');
        assert.strictEqual(proc.name, 'Fl32_Bwl_Back_Process_Sign_In_Code_Email.process');

        // get database connector then execute the process
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = await container.get('TeqFw_Core_Back_RDb_Connector$');  // singleton instance
        try {
            const trx = await rdb.startTransaction();
            const res = await proc({to: 'flancer64@gmail.com', code: '3214'});
            assert(res === true);
            // finalize data handling
            await trx.commit();
        } finally {
            await rdb.disconnect();
        }

    });
});
