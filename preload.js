const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  controlWindow: (action) => ipcRenderer.send('window-control', action),
  onTopStatus: (callback) => ipcRenderer.on('top-status', (_event, value) => callback(value))
});
