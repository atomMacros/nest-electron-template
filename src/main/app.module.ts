import path, { join, resolve } from "node:path";
import { Module } from "@nestjs/common";
import {
  ELECTRON_WINDOW_DEFAULT_NAME,
  ElectronModule,
} from "@doubleshot/nest-electron";
import { BrowserWindow, Menu, app, dialog, globalShortcut } from "electron";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SessionController } from "./ipc/session.controller";
import { WinController } from "./ipc/win.controller";

const initLoadingWindow = function () {
  const isDev = !app.isPackaged;
  let win_loading = new BrowserWindow({
    width: 200,
    height: 200,
    autoHideMenuBar: false,
    show: true,
    alwaysOnTop: true,
    transparent: true,
    titleBarStyle: "hidden",
    resizable: false,
    movable: false,
  });
  // NOTE(2024-08-15 23:38:48 谭人杰): 禁用菜单
  Menu.setApplicationMenu(null);

  // NOTE(2024-08-15 23:40:33 谭人杰): 窗口生命周期监听
  const URL = isDev
    ? "../../static/loading.html"
    : `${join(app.getAppPath(), "../html/loading.html")}`;
  win_loading.on("ready-to-show", () => {
    win_loading.setAlwaysOnTop(false);
  });
  win_loading.on("closed", () => {
    console.log('loseed==============');
    
    // win_loading.removeAllListeners();
  });
  win_loading.loadFile(URL);
  return win_loading;
};

const initMainWindow = function () {
  const isDev = !app.isPackaged;

  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    autoHideMenuBar: true,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, "../preload/index.js"),
    },
  });
  // NOTE(2024-08-15 23:38:48 谭人杰): 禁用菜单
  Menu.setApplicationMenu(null);
  // NOTE(2024-08-15 23:13:30 谭人杰): 解决跨域
  const filter = {
    urls: ["http://localhost:*/*"],
  };
  win.webContents.session.webRequest.onHeadersReceived(
    filter,
    (details, callback) => {
      const { responseHeaders } = details;
      responseHeaders["Access-Control-Allow-Origin"] = ["*"];
      callback({ responseHeaders });
    }
  );
  // NOTE(2024-08-16 19:50:49 谭人杰): 注册快捷键
  // 当应用处于前台时，注册快捷键
  win.on("focus", () => {
    if (!globalShortcut.isRegistered("F1")) {
      globalShortcut.register("F1", () => {
        win.webContents.reload();
      });
    }
    if (!globalShortcut.isRegistered("F2")) {
      globalShortcut.register("F2", () => {
        win.webContents.toggleDevTools();
      });
    }
  });
  // 当应用处于后台时，注销快捷键
  win.on("blur", () => {
    console.log("=================blur=================");
    globalShortcut.unregisterAll();
  });

  win.on("minimize", () => {
    console.log("=================minimize=================");
    globalShortcut.unregisterAll();
  });

  // NOTE(2024-08-15 23:40:33 谭人杰): 窗口生命周期监听
  const URL = isDev
    ? process.env.DS_RENDERER_URL
    : `file://${join(app.getAppPath(), "dist/render/index.html")}`;

  win.on("ready-to-show", () => {
    setImmediate(() => {
      win.setAlwaysOnTop(false);
    });
  });
  win.on("closed", () => {
    win.destroy();
  });
  win.loadURL(URL);
  return win;
};

@Module({
  imports: [
    ElectronModule.registerAsync({
      name: ["loading", ELECTRON_WINDOW_DEFAULT_NAME],
      useFactory: async () => {
        const win_loading = initLoadingWindow();
        const win_main = initMainWindow();
        return [win_loading, win_main];
      },
    }),
  ],
  controllers: [AppController, SessionController, WinController],
  providers: [AppService],
})
export class AppModule {}
