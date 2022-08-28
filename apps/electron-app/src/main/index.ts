import { app, BrowserWindow } from "electron";
import type { BrowserWindowConstructorOptions } from "electron";
import windowStateKeeper from "electron-window-state";
// import "./api";
import path from "path";

const isDevelopment = !app.isPackaged;

function createWindow() {
  const windowOptions: BrowserWindowConstructorOptions = {
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: 20,
      y: 32,
    },
    webPreferences: {
      contextIsolation: true,
      devTools: isDevelopment,
      spellcheck: false,
      // nodeIntegration: true,
      preload: path.join(__dirname + "/../dist-renderer/preload.js"),
    },
    show: false,
  };

  const windowState = windowStateKeeper({
    defaultWidth: windowOptions.minWidth,
    defaultHeight: windowOptions.minHeight,
  });

  const browserWindow = new BrowserWindow({
    ...windowOptions,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
  });

  windowState.manage(browserWindow);

  browserWindow.once("ready-to-show", () => {
    browserWindow.show();
    browserWindow.focus();
  });

  const port = process.env.PORT || 3000;

  if (isDevelopment) {
    void browserWindow.loadURL(`http://localhost:${port}`);
  } else {
    void browserWindow.loadFile("./index.html");
  }
}

void app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
