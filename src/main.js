const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");

/* const sqlite = require('sqlite3');
const db = new sqlite.Database(
  "C:/Users/Prime/Downloads/test.db",
  (err) => {
    if (err) {
      console.log(err);
    }
  }
); */

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    "width": 1920,
    "height": 1080,
    "webPreferences": {
      /* "nodeIntegration": true,
      "contextIsolation": false, */
      "contextIsolation": true,
      "preload": path.join(__dirname, "preload.js"),
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on("toMain", (event, args) => {
  fs.writeFile("C:/Users/Prime/Downloads/test.txt", "foo", (err) => {
    if (err) {
      console.log(err);
    }
  });
});
