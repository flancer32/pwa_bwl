#!/usr/bin/env node
'use strict';
/** **************************************************************************
 * Main script to create and to run TeqFW backend application.
 * ************************************************************************ */
import $path from 'path';
import Container from '@teqfw/di';

// TODO: should we have version as config parameter?
const VERSION = '0.11.0';

/* Resolve paths to main folders */
const url = new URL(import.meta.url);
const script = url.pathname;
const bin = $path.dirname(script);
const root = $path.join(bin, '..');
try {
    /* Create and setup DI container */
    /** @type {TeqFw_Di_Container} */
    const container = new Container();
    const srcCore = $path.join(root, 'node_modules/@teqfw/core-app/src');
    const srcDi = $path.join(root, 'node_modules/@teqfw/di/src');
    container.addSourceMapping('TeqFw_Core_App', srcCore, true, 'mjs');
    container.addSourceMapping('TeqFw_Di', srcDi, true, 'mjs');

    // Bootstrap configuration object (used in 'TeqFw_Core_App_Back_App')
    /** @type {TeqFw_Core_App_Back_App.Bootstrap} */
    const bootstrap = {version: VERSION, root};
    container.set('bootstrap', bootstrap);

    /** Request Container to construct app then run it */
    const app = await container.get('TeqFw_Core_App_Back_App$');

    await app.init();
    await app.run();
} catch (e) {
    console.error('Cannot create or run TeqFW application.');
    console.dir(e);
}
