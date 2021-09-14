const { contextBridge, ipcRenderer } = require("electron");
const sendChannels = ["addNote"];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      if (sendChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    runDBStatement: (channel, data) => {
      return ipcRenderer.invoke("runDBStatement", data);
    }
  }
);
