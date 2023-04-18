const { app, BrowserWindow, Notification } = require("electron");
const path = require("path");

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
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

}

/**
 * MAIN PROCESS
 */
app.whenReady().then(createWindow);

//quit when windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

