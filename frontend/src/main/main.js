import { app, BrowserWindow, ipcMain, powerMonitor, desktopCapturer, Notification, session, shell } from 'electron';
import path from 'path';
const iohook = require('iohook-raub');
require('update-electron-app')();

let mainWindow;
let captureInterval;
let storedCookie;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false,
    icon: path.join(__dirname, '../../assets/icons/taskminderlogo.ico'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.mjs'),
      nodeIntegration: true
    }
  });
  
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url); // Open URL in user's browser.
    return { action: "deny" }; // Prevent the app from opening the URL.
  })
}

function handleActivity(){
  let isActive = false;
  let inactivityTimer;

  const handleMovement = () => {
    if (!isActive) {
      isActive = true;
      mainWindow.webContents.send('user-activity');
    }
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      isActive = false;
      mainWindow.webContents.send('user-idle');
    }, 1000);
  };

  iohook.on('keydown', handleMovement);
  iohook.on('keyup', handleMovement);
  iohook.on('mousemove', handleMovement);
  iohook.on('mousedown', handleMovement);
  iohook.on('mouseup', handleMovement);
  iohook.on('mouseclick', handleMovement);
  iohook.on('mousedrag', handleMovement);
  iohook.on('mousewheel', handleMovement);
  iohook.start();
}

async function takeScreenshot(){
  try {
    const date = new Date();
    const timestamp = date.toISOString().replace(/:/g, '-');
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours > 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12
    const formattedMins = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMins} ${ampm}`
    const fileName = `screenshot-${timestamp}.png`;

    // Capture the screenshot
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: {
        width: 800,
        height: 800
      }
    });
    const img = sources[0].thumbnail.toJPEG(80);

    const data = {
      screenshot: img.toString('base64'),
      fileName: fileName,
      time: formattedTime
    };
    
    mainWindow.webContents.send('upload-screenshot', data)

    mainWindow.webContents.send('screenshot-saved');

    const options = {
      title: 'TaskMinder',
      body: 'Screenshot taken',
    };

    showNotification(options);
  } catch (error) {
    console.error('Error taking or uploading screenshot:', error);
  }
}

function showNotification(options){
  if (process.platform === 'win32')
    {
        app.setAppUserModelId(app.name);
    }
    const customNotification = new Notification(options);
    customNotification.show();
};

app.whenReady().then(() => {
  createWindow();  

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const setCookieHeaders = details.responseHeaders['set-cookie'] || details.responseHeaders['Set-Cookie'];
    if (setCookieHeaders) {
      try {
        const cookieString = setCookieHeaders[0];
        const cookieName = cookieString.split(';')[0].split('=')[0];
        const cookieValue = cookieString.split(';')[0].split('=')[1];
        const expirationDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

        const cookieDetails = {
          url: 'http://localhost:5000',
          name: cookieName,
          value: cookieValue,
          path: '/',
          secure: true,
          httpOnly: true,
          expirationDate: expirationDate,
          domain: 'localhost'
        };

        storedCookie = cookieDetails;

        session.defaultSession.cookies.set(cookieDetails)
      } catch (error) {
        console.error('Error setting cookie:', error);
      }
    }
    callback({ cancel: false });
  });

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    if (storedCookie && details.url.startsWith('http://localhost:5000')) {
      // Add cookie to request headers
      details.requestHeaders['Cookie'] = `${storedCookie.name}=${storedCookie.value}`;
    }
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  
  ipcMain.on('start-capture', (event, projectName) => {
    takeScreenshot()
    captureInterval = setInterval(() => takeScreenshot(), 300000);

    const options = {
      title: 'TaskMinder',
      body: `Tracker started for project ${projectName}`,
    };
    showNotification(options);
  });

  ipcMain.on('stop-capture', (event, projectName) => {
    takeScreenshot()
    clearInterval(captureInterval);

    const options = {
      title: 'TaskMinder',
      body: `Tracker paused for project ${projectName}`,
    };
    showNotification(options);
  });

  powerMonitor.on('resume', () => {
    mainWindow.webContents.send('user-activity');
  });

  powerMonitor.on('suspend', () => {
    mainWindow.webContents.send('user-idle');
  });

  handleActivity();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});

if (require('electron-squirrel-startup') === true) app.quit();