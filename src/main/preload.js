const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  toggleOverlay: () => ipcRenderer.invoke('toggle-overlay'),
  showDashboard: () => ipcRenderer.invoke('show-dashboard'),
  setOverlayPosition: (position) => ipcRenderer.invoke('set-overlay-position', position),
  
  // Listen for events from main process
  onOverlayToggle: (callback) => {
    ipcRenderer.on('overlay-toggle', (_, expanded) => callback(expanded));
  },
  
  onNavigate: (callback) => {
    ipcRenderer.on('navigate', (_, route) => callback(route));
  },
  
  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});