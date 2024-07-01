import { contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('electron', {
  userActivity: (callback) => ipcRenderer.on('user-activity', callback),
  userIdle:(callback) => ipcRenderer.on('user-idle', callback),
  startCapture: (data)=> ipcRenderer.send('start-capture', data),
  stopCapture: (data)=> ipcRenderer.send('stop-capture', data),
  screenshotMsg: (callback)=> ipcRenderer.on('screenshot-saved', callback),
  uploadScreenShot: (callback)=> ipcRenderer.on('upload-screenshot', (event, data) =>callback(data)),
})

