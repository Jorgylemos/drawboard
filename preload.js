const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  controlWindow: (action) => ipcRenderer.send("window-control", action),
  onTopStatus: (cb) => ipcRenderer.on("top-status", (_e, v) => cb(v)),

  checkForUpdates: () => ipcRenderer.send("check-update"),
  restartToUpdate: () => ipcRenderer.send("restart-to-update"),
  onStatusUpdate: (cb) =>
    ipcRenderer.on("status-update", (_e, msg, type) => cb(msg, type)),
  onDownloadProgress: (cb) =>
    ipcRenderer.on("download-progress", (_e, p) => cb(p)),
});
