import { contextBridge, ipcRenderer} from 'electron'
import iohook from '../../utils/iohook-wrapper'

contextBridge.exposeInMainWorld('electron', {
  userActivity: (callback) => ipcRenderer.on('user-activity', callback),
  userIdle:(callback) => ipcRenderer.on('user-idle', callback),
  startCapture: (data)=> ipcRenderer.send('start-capture', data),
  stopCapture: (data)=> ipcRenderer.send('stop-capture', data),
  screenshotMsg: (callback)=> ipcRenderer.on('screenshot-saved', callback),
  uploadScreenShot: (callback)=> ipcRenderer.on('upload-screenshot', (event, data) =>callback(data)),
})
let isActive = false;
let inactivityTimer;

//Designates second as active or inactive depending on user interaction with keyboard and mouse
const handleMovement = () => {
  if (!isActive) {
    isActive = true;
    ipcRenderer.send('user-activity');
  }
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    isActive = false;
    ipcRenderer.send('user-idle');
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
