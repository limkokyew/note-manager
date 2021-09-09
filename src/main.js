const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");
const sqlite = require('sqlite3');
let db;

function setupDatabase() {
  db = new sqlite.Database(
    path.join(app.getPath("userData"), "note-manager-main.db"),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  // Create note categories table
  db.run(`
  CREATE TABLE IF NOT EXISTS note_categories (
    name VARCHAR (50) PRIMARY KEY
  );`);
  // Create notes table
  db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     VARCHAR (50),
    content  VARCHAR (2000),
    create_date DATETIME,
    edit_date   DATETIME,
    category VARCHAR (50) REFERENCES note_categories(name) ON DELETE CASCADE
                                                           ON UPDATE CASCADE
  );`);
}

setupDatabase();

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
  db.close();
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
ipcMain.on("addNote", (ipc_event, args) => {
  const currentDate = new Date().toISOString().replace("T", " ").substr(0, 19);
  console.log(args);
  db.run(`
  INSERT INTO notes(name, content, create_date, edit_date, category)
  VALUES(
    "${args.noteName}",
    "",
    "${currentDate}",
    "${currentDate}",
    NULL
  );`);
});

ipcMain.handle("runDBStatement", async (ipc_event, args) => {
  console.log(ipc_event);
  console.log(args);
  return new Promise((resolve, reject) => {
    db.all(args, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
  /* let results = db.all(args, function (err, result) {
    return result;
  });
  return results; */
});
