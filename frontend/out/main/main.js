import { app, BrowserWindow } from "electron";
import "path";
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false
  });
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => mainWindow = null);
}
app.whenReady().then(() => {
  createWindow();
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
