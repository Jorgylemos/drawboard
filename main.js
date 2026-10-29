const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("node:path");

const iconPath = app.isPackaged
  ? path.join(process.resourcesPath, "icon.png")
  : path.join(__dirname, "build", "icon.png");

let mainWindow = null;

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function sendStatus(message, type = "info") {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("status-update", message, type);
  }
}

// Listeners registrados UMA vez
autoUpdater.on("checking-for-update", () => {
  sendStatus("Verificando atualizações...", "info");
});
autoUpdater.on("update-available", (info) => {
  sendStatus(`Nova versão ${info.version} encontrada! Baixando...`, "success");
});
autoUpdater.on("update-not-available", () => {
  sendStatus("Você já está na versão mais recente.", "success");
});
autoUpdater.on("download-progress", (p) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("download-progress", { percent: p.percent });
  }
});
autoUpdater.on("update-downloaded", () => {
  sendStatus("Pronto! Reiniciando em 3s para aplicar...", "success");
  setTimeout(() => autoUpdater.quitAndInstall(false, true), 3000);
});
autoUpdater.on("error", (err) => {
  sendStatus(`Erro na atualização: ${err.message}`, "error");
});

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: true,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow = win;
  win.loadFile(path.join(__dirname, "index.html"));

  win.on("closed", () => {
    if (mainWindow === win) mainWindow = null;
  });

  ipcMain.on("window-control", (event, action) => {
    if (action === "close") win.close();
    if (action === "minimize") win.minimize();
    if (action === "toggle-top") {
      const isTop = win.isAlwaysOnTop();
      win.setAlwaysOnTop(!isTop);
      event.reply("top-status", !isTop);
    }
  });

  ipcMain.on("check-update", async () => {
    try {
      sendStatus("Verificando atualizações...", "info");
      const result = await autoUpdater.checkForUpdates();
      if (!result) {
        sendStatus("Verificação indisponível (app não empacotado).", "warning");
      }
    } catch (err) {
      sendStatus(`Erro: ${err.message}`, "error");
    }
  });

  ipcMain.on("restart-to-update", () => {
    autoUpdater.quitAndInstall(false, true);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
