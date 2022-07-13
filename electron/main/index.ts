import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from "electron";
import store from "electron-store";
import { release } from "os";
import { join } from "path";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    height: 1000,
    resizable: true,
    width: 1245,
    title: "Main window",
    icon: join(ROOT_PATH.public, "favicon.svg"),
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegrationInWorker: true,
    },
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});

const comicBooksStore = new store();
const userDataStore = new store({
  schema: {
    libraryLocation: {
      type: "string",
    },
  },
});

ipcMain.handle("clearLibraryLocation", () => {
  userDataStore.clear();
});

ipcMain.handle("getLibraryLocation", () => {
  return userDataStore.get("libraryLocation");
});

ipcMain.handle("setLibraryLocation", () => {
  const newLibraryDirectory = dialog.showOpenDialogSync({
    properties: ["openDirectory"],
  })[0];

  userDataStore.set("libraryLocation", newLibraryDirectory);

  return newLibraryDirectory;
});

const menu = Menu.buildFromTemplate([
  {
    label: "DEV",
    submenu: [
      {
        click: (_, focusedWindow) => {
          focusedWindow.webContents.toggleDevTools();
        },
        label: "Developer Tools",
        role: "toggleDevTools",
      },
    ],
  },
]);
Menu.setApplicationMenu(menu);
