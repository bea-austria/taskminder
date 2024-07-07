"use strict";
const { app, BrowserWindow, ipcMain, powerMonitor, desktopCapturer, Notification, session, shell } = require("electron");
const path = require("path");
const iohook = require("iohook-raub");
let mainWindow;
let captureInterval;
let storedCookie;
const iconPath = path.join(__dirname, "../../../assets/icons/taskminderlogo.ico");
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
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
async function handleActivity() {
  let isActive = false;
  let inactivityTimer;
  const handleMovement = () => {
    if (!isActive) {
      isActive = true;
      mainWindow.webContents.send("user-activity");
    }
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      isActive = false;
      mainWindow.webContents.send("user-idle");
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
          url: "https://taskminder-mysql-api.onrender.com",
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
    if (storedCookie && details.url.startsWith("https://taskminder-mysql-api.onrender.com")) {
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
  handleActivity();
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
if (require("electron-squirrel-startup") === true)
  app.quit();
