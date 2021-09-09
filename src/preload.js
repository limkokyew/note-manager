const { contextBridge, ipcRenderer } = require("electron");
const sendChannels = ["addNote"];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      // whitelist channels
      if (sendChannels.includes(channel)) {
        console.log("About to send following data!");
        console.log(data);
        ipcRenderer.send(channel, data);
      }
    },
    runDBStatement: (channel, data) => {
      return ipcRenderer.invoke("runDBStatement", data);
    }
  }
);
