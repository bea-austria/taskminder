import { app, session, ipcMain, powerMonitor, BrowserWindow, shell, desktopCapturer, Notification } from "electron";
import path from "path";
import __cjs_url__ from "node:url";
import __cjs_path__ from "node:path";
import __cjs_mod__ from "node:module";
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require2 = __cjs_mod__.createRequire(import.meta.url);
let mainWindow;
let captureInterval;
let storedCookie;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false,
    icon: path.join(__dirname, "../../assets/icons/taskminderlogo.ico"),
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.mjs"),
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  mainWindow.on("closed", () => mainWindow = null);
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
}
async function takeScreenshot() {
  try {
    const date = /* @__PURE__ */ new Date();
    const timestamp = date.toISOString().replace(/:/g, "-");
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours > 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMins = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMins} ${ampm}`;
    const fileName = `screenshot-${timestamp}.png`;
    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: {
        width: 800,
        height: 800
      }
    });
    const img = sources[0].thumbnail.toJPEG(80);
    const data = {
      screenshot: img.toString("base64"),
      fileName,
      time: formattedTime
    };
    mainWindow.webContents.send("upload-screenshot", data);
    mainWindow.webContents.send("screenshot-saved");
    const options = {
      title: "TaskMinder",
      body: "Screenshot taken"
    };
    showNotification(options);
  } catch (error) {
    console.error("Error taking or uploading screenshot:", error);
  }
}
function showNotification(options) {
  if (process.platform === "win32") {
    app.setAppUserModelId(app.name);
  }
  const customNotification = new Notification(options);
  customNotification.show();
}
app.whenReady().then(() => {
  createWindow();
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const setCookieHeaders = details.responseHeaders["set-cookie"] || details.responseHeaders["Set-Cookie"];
    if (setCookieHeaders) {
      try {
        const cookieString = setCookieHeaders[0];
        const cookieName = cookieString.split(";")[0].split("=")[0];
        const cookieValue = cookieString.split(";")[0].split("=")[1];
        const expirationDate = Math.floor(Date.now() / 1e3) + 30 * 24 * 60 * 60;
        const cookieDetails = {
          url: "http://localhost:5000",
          name: cookieName,
          value: cookieValue,
          path: "/",
          secure: true,
          httpOnly: true,
          expirationDate,
          domain: "localhost"
        };
        storedCookie = cookieDetails;
        session.defaultSession.cookies.set(cookieDetails);
      } catch (error) {
        console.error("Error setting cookie:", error);
      }
    }
    callback({ cancel: false });
  });
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    if (storedCookie && details.url.startsWith("http://localhost:5000")) {
      details.requestHeaders["Cookie"] = `${storedCookie.name}=${storedCookie.value}`;
    }
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  ipcMain.on("start-capture", (event, projectName) => {
    takeScreenshot();
    captureInterval = setInterval(() => takeScreenshot(), 3e5);
    const options = {
      title: "TaskMinder",
      body: `Tracker started for project ${projectName}`
    };
    showNotification(options);
  });
  ipcMain.on("stop-capture", (event, projectName) => {
    takeScreenshot();
    clearInterval(captureInterval);
    const options = {
      title: "TaskMinder",
      body: `Tracker paused for project ${projectName}`
    };
    showNotification(options);
  });
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
