/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './app.jsx';
import './index.css';

console.log("test");
/* const fs = require("C:/Users/Prime/NodeProjects/note-manager/node_modules/fs");
fs.readdir("C:/Users/Prime/Downloads", (err, files) => {
  console.log("done");
}) */
/* const sqlite = require('sqlite3');
const db = new sqlite.Database(
  "C:/Users/Prime/Downloads/test.db",
  (err) => {
    console.log(err);
  }
); */

console.log('👋 This message is being logged by "renderer.js", included via webpack');
