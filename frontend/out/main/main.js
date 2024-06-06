import { app, ipcMain, powerMonitor, BrowserWindow } from "electron";
import * as path from "path";
import __cjs_url__ from "node:url";
import __cjs_path__ from "node:path";
import __cjs_mod__ from "node:module";
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require2 = __cjs_mod__.createRequire(import.meta.url);
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "../preload/preload.mjs")
    }
  });
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => mainWindow = null);
}
app.whenReady().then(() => {
  createWindow();
  ipcMain.on("user-activity", (event) => {
    mainWindow.webContents.send("user-activity");
  });
  ipcMain.on("user-idle", (event) => {
    mainWindow.webContents.send("user-idle");
  });
  powerMonitor.on("resume", () => {
    mainWindow.webContents.send("user-activity");
  });
  powerMonitor.on("suspend", () => {
    mainWindow.webContents.send("user-idle");
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
