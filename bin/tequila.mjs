#!/usr/bin/env node
'use strict';
/** **************************************************************************
 * Main script to create and run an application.
 * ************************************************************************ */
import $path from 'path';
import Container from '@teqfw/di';

// TODO: should we have version as config parameter?
const VERSION = '0.1.0';

/* Resolve paths to main folders */
const url = new URL(import.meta.url);
const script = url.pathname;
const bin = $path.dirname(script);
const root = $path.join(bin, '..');

/* Create and setup DI container */
/** @type {TeqFw_Di_Container} */
const container = new Container();
const srcCore = $path.join(root, 'node_modules/@teqfw/core-app/src');
container.addSourceMapping('TeqFw_Core_App', srcCore, true, 'mjs');

// Manually create bootstrap configuration object (used in constructor of 'Vendor_Project_App')
/** @type {TeqFw_Core_App_Launcher.Bootstrap} */
const bootstrap = {version: VERSION, root};
container.set('bootstrap', bootstrap);

/** Request Container to construction app then run it */
container.get('TeqFw_Core_App_Launcher$')
    .then(
        /**  @param {TeqFw_Core_App_Launcher} launcher */
        async (launcher) => {
            try {
                await launcher.init();
                await launcher.run();
            } catch (e) {
                console.error('Cannot init or run TeqFW application.');
                console.dir(e);
            }
        }
    )
    .catch(error => {
        console.error('Cannot create TeqFW application.');
        console.dir(error);
    });
