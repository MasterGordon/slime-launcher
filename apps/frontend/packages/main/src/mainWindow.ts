import { app, BrowserWindow } from "electron";
import { join } from "path";
import { URL } from "url";
import {
  registerQueryIpc,
  registerMutationIpc,
  registerListeners,
} from "./api";
import { generateSettings, modSourceManager } from "@slime-launcher/piston";
import { modrinthSource } from "@slime-launcher/mod-sources";

async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    title: "Slime Launcher",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false,
      preload: join(app.getAppPath(), "packages/preload/dist/index.cjs"),
    },
    minWidth: 1200,
    minHeight: 900,
  });

  // if (process.env.NODE_ENV !== "development") browserWindow.removeMenu();

  browserWindow.on("ready-to-show", () => {
    browserWindow?.show();
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test.
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL(
          "../renderer/dist/index.html",
          "file://" + __dirname,
        ).toString();

  await browserWindow.loadURL(pageUrl);
  registerMutationIpc();
  registerQueryIpc();
  registerListeners();
  void generateSettings();
  modSourceManager.registerModSource(modrinthSource);

  return browserWindow;
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
