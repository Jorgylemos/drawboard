const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    frame: false,             // Remove a barra padrão do SO
    transparent: true,         // Permite fundo com opacidade/blur
    alwaysOnTop: true,         // Mantém a janela por cima de tudo
    hasShadow: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  // Eventos de janela vindos do renderer
  ipcMain.on('window-control', (event, action) => {
    if (action === 'close') win.close();
    if (action === 'minimize') win.minimize();
    if (action === 'toggle-top') {
      const isTop = win.isAlwaysOnTop();
      win.setAlwaysOnTop(!isTop);
      event.reply('top-status', !isTop);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
