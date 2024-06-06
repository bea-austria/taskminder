import { app, BrowserWindow, ipcMain, powerMonitor } from 'electron';
import * as path from 'path';
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload/preload.mjs'),
    }
  });

  // Vite dev server URL
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('user-activity',(event)=>{
    mainWindow.webContents.send('user-activity');
  })

  ipcMain.on('user-idle',(event)=>{
    mainWindow.webContents.send('user-idle');
  })

  powerMonitor.on('resume', () => {
    mainWindow.webContents.send('user-activity');
  });
  
  powerMonitor.on('suspend', () => {
    mainWindow.webContents.send('user-idle');
  });
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