const { app, BrowserWindow, Tray, Menu, screen, ipcMain, nativeImage } = require('electron');
const path = require('path');

let overlayWindow = null;
let dashboardWindow = null;
let tray = null;
let isOverlayExpanded = true;  // Start expanded to ensure proper positioning

// Window dimensions - according to layout structure
const OVERLAY_COLLAPSED = { width: 72, height: 32 };  // 72x32px as per spec
const OVERLAY_EXPANDED = { width: 420, height: 600 };  // 420x600px as per spec
const DASHBOARD_SIZE = { width: 1440, height: 900 };

// Determine if we're in development
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createOverlayWindow() {
  const display = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = display.workAreaSize;
  
  // Position overlay to ensure it's fully visible - start expanded to avoid positioning issues
  const x = Math.max(20, screenWidth - OVERLAY_EXPANDED.width - 40);
  const y = Math.max(20, screenHeight - OVERLAY_EXPANDED.height - 40);
  
  overlayWindow = new BrowserWindow({
    width: OVERLAY_EXPANDED.width,
    height: OVERLAY_EXPANDED.height,
    x: x,
    y: y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Try to set vibrancy/blur effects based on platform
  if (process.platform === 'darwin') {
    // macOS vibrancy
    overlayWindow.setVibrancy('under-window');
  } else if (process.platform === 'win32') {
    // Windows - try to set background material if available
    try {
      // This is only available on Windows 10/11 with specific builds
      if (overlayWindow.setBackgroundMaterial) {
        overlayWindow.setBackgroundMaterial('acrylic');
      }
    } catch (e) {
      console.log('Transparent effects not available:', e.message);
    }
  }

  // Load the overlay URL - dynamically detect Vite port
  const overlayUrl = isDev 
    ? 'http://localhost:5179/#/overlay'
    : `file://${path.join(__dirname, '../renderer/index.html#/overlay')}`;
  
  overlayWindow.loadURL(overlayUrl);

  // Development - open DevTools
  if (isDev) {
    overlayWindow.webContents.openDevTools({ mode: 'detach' });
  }

  overlayWindow.on('closed', () => {
    overlayWindow = null;
  });
}

function createDashboardWindow() {
  dashboardWindow = new BrowserWindow({
    width: DASHBOARD_SIZE.width,
    height: DASHBOARD_SIZE.height,
    frame: true,
    show: false,
    icon: path.join(__dirname, '../../src/assets/logo.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the dashboard URL
  const dashboardUrl = isDev 
    ? 'http://localhost:5174'
    : `file://${path.join(__dirname, '../renderer/index.html')}`;
  
  dashboardWindow.loadURL(dashboardUrl);

  dashboardWindow.once('ready-to-show', () => {
    dashboardWindow.show();
  });

  // Development - open DevTools
  if (isDev) {
    dashboardWindow.webContents.openDevTools();
  }

  dashboardWindow.on('closed', () => {
    dashboardWindow = null;
  });
}

function toggleOverlay() {
  if (!overlayWindow) {
    createOverlayWindow();
    return;
  }

  const display = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = display.workAreaSize;
  
  if (isOverlayExpanded) {
    // Collapse - position small pill at bottom right with proper bounds checking
    const collapsedX = Math.max(20, screenWidth - OVERLAY_COLLAPSED.width - 40);
    const collapsedY = Math.max(20, screenHeight - OVERLAY_COLLAPSED.height - 40);
    
    overlayWindow.setBounds({
      width: OVERLAY_COLLAPSED.width,
      height: OVERLAY_COLLAPSED.height,
      x: collapsedX,
      y: collapsedY
    });
    overlayWindow.setResizable(false);
  } else {
    // Expand - ensure full window fits on screen
    const expandedX = Math.max(20, screenWidth - OVERLAY_EXPANDED.width - 40);
    const expandedY = Math.max(20, screenHeight - OVERLAY_EXPANDED.height - 40);
    
    overlayWindow.setBounds({
      width: OVERLAY_EXPANDED.width,
      height: OVERLAY_EXPANDED.height,
      x: expandedX,
      y: expandedY
    });
    overlayWindow.setResizable(false);
  }
  
  isOverlayExpanded = !isOverlayExpanded;
  
  // Send toggle event to renderer
  if (overlayWindow && overlayWindow.webContents) {
    overlayWindow.webContents.send('overlay-toggle', isOverlayExpanded);
  }
}

function createTray() {
  // Create tray icon
  const iconPath = path.join(__dirname, '../../src/assets/logo.png');
  
  // Create a simple icon if file doesn't exist
  let trayIcon;
  try {
    trayIcon = nativeImage.createFromPath(iconPath);
    if (trayIcon.isEmpty()) {
      // Create a default icon
      trayIcon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    }
  } catch (e) {
    // Create a default icon
    trayIcon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
  }
  
  tray = new Tray(trayIcon);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Dashboard',
      click: () => {
        if (dashboardWindow) {
          dashboardWindow.show();
          dashboardWindow.focus();
        } else {
          createDashboardWindow();
        }
      }
    },
    {
      label: 'Toggle Overlay',
      click: () => {
        toggleOverlay();
      }
    },
    { type: 'separator' },
    {
      label: 'Settings',
      click: () => {
        if (!dashboardWindow) {
          createDashboardWindow();
        }
        dashboardWindow.webContents.send('navigate', '/settings');
        dashboardWindow.show();
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);
  
  tray.setToolTip('MyDecisions - AI Decision Intelligence');
  tray.setContextMenu(contextMenu);
  
  // Click on tray icon toggles overlay
  tray.on('click', () => {
    toggleOverlay();
  });
}

// IPC Handlers
ipcMain.handle('toggle-overlay', () => {
  toggleOverlay();
});

ipcMain.handle('show-dashboard', () => {
  if (dashboardWindow) {
    dashboardWindow.show();
    dashboardWindow.focus();
  } else {
    createDashboardWindow();
  }
});

ipcMain.handle('set-overlay-position', (event, position) => {
  if (!overlayWindow) return;
  
  const display = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = display.workAreaSize;
  const bounds = overlayWindow.getBounds();
  
  switch (position) {
    case 'top-left':
      overlayWindow.setPosition(20, 20);
      break;
    case 'top-right':
      overlayWindow.setPosition(Math.max(20, screenWidth - bounds.width - 40), 20);
      break;
    case 'bottom-left':
      overlayWindow.setPosition(20, Math.max(20, screenHeight - bounds.height - 40));
      break;
    case 'bottom-right':
      overlayWindow.setPosition(
        Math.max(20, screenWidth - bounds.width - 40), 
        Math.max(20, screenHeight - bounds.height - 40)
      );
      break;
  }
});

// App event handlers
app.whenReady().then(() => {
  createDashboardWindow();
  createOverlayWindow();
  createTray();
  
  app.on('activate', () => {
    // On macOS, re-create windows when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createDashboardWindow();
      createOverlayWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app quit
app.on('before-quit', (event) => {
  // Clean up
  if (!app.isQuitting) {
    event.preventDefault();
    
    if (overlayWindow) {
      overlayWindow.close();
    }
    if (dashboardWindow) {
      dashboardWindow.close();
    }
    
    app.isQuitting = true;
    app.quit();
  }
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our windows instead
    if (dashboardWindow) {
      if (dashboardWindow.isMinimized()) dashboardWindow.restore();
      dashboardWindow.focus();
    }
  });
}