const { app, BrowserWindow, Notification } = require("electron");
const path = require("path");

let win;

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 755,
    maxWidth: 755,
    height: 800,
    maxHeight: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //load the index.html from a url
  win.loadURL("http://localhost:3000");
  //win.setMenu(null);

  // Wait for the React app to finish loading.
  let refresh = false;
  win.webContents.on("did-finish-load", () => {
    if(!refresh){
      win.reload(); // Refresh the Electron window when the React app is ready
      refresh = true;
    }
  });

  win.on("closed", () => {
    win = null;
  });
};

/**
 * MAIN PROCESS
 */
app.whenReady().then(createWindow);

//quit when windows are closed
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
