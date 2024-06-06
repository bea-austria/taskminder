import { contextBridge, ipcRenderer} from 'electron'
const iohook = require('iohook-raub');

contextBridge.exposeInMainWorld('electron', {
  userActivity: (callback) => ipcRenderer.on('user-activity', callback),
  userIdle:(callback) => ipcRenderer.on('user-idle', callback)
})

let isActive = false;
let inactivityTimer;

const handleMovement = () => {
  if (!isActive) {
    isActive = true;
    ipcRenderer.send('user-activity');
  }
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    isActive = false;
    ipcRenderer.send('user-idle')
  }, 1000);
};


iohook.on('mousedown', handleMovement);
iohook.on('keypress', handleMovement);
iohook.on('mousemove', handleMovement);
iohook.on('mousewheel', handleMovement);
iohook.start();
