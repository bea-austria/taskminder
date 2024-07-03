import { contextBridge, ipcRenderer } from "electron";
import __cjs_url__ from "node:url";
import __cjs_path__ from "node:path";
import __cjs_mod__ from "node:module";
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require2 = __cjs_mod__.createRequire(import.meta.url);
const iohook = require2("iohook-raub");
contextBridge.exposeInMainWorld("electron", {
  userActivity: (callback) => ipcRenderer.on("user-activity", callback),
  userIdle: (callback) => ipcRenderer.on("user-idle", callback),
  startCapture: (data) => ipcRenderer.send("start-capture", data),
  stopCapture: (data) => ipcRenderer.send("stop-capture", data),
  screenshotMsg: (callback) => ipcRenderer.on("screenshot-saved", callback),
  uploadScreenShot: (callback) => ipcRenderer.on("upload-screenshot", (event, data) => callback(data))
});
let isActive = false;
let inactivityTimer;
const handleMovement = () => {
  if (!isActive) {
    isActive = true;
    ipcRenderer.send("user-activity");
  }
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    isActive = false;
    ipcRenderer.send("user-idle");
  }, 1e3);
};
iohook.on("keydown", handleMovement);
iohook.on("keyup", handleMovement);
iohook.on("mousemove", handleMovement);
iohook.on("mousedown", handleMovement);
iohook.on("mouseup", handleMovement);
iohook.on("mouseclick", handleMovement);
iohook.on("mousedrag", handleMovement);
iohook.on("mousewheel", handleMovement);
iohook.start();
