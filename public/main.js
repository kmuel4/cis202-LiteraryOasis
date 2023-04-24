const { app, BrowserWindow } = require("electron");

let win; // Declare win variable in the global scope

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 755,
    maxWidth: 960,
    height: 800,
    maxHeight: 1024,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load the index.html from a URL.
  win.loadURL("http://localhost:3000");

  // Wait for the DOM to finish loading.
  let refresh = true;
  win.webContents.on("dom-ready", () => {
    if (refresh) {
      // Refresh the window once the DOM is ready.
      win.reload();
      refresh = false;
    }
  });
};

/**
 * MAIN PROCESS
 */
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
