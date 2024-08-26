import { Controller } from "@nestjs/common";
import { IpcHandle, Window } from "@doubleshot/nest-electron";
import { BrowserWindow } from "electron";

@Controller("win")
export class WinController {
  constructor(
    @Window() private readonly win: BrowserWindow,
    @Window("loading") private readonly win_loading: BrowserWindow
  ) {}

  @IpcHandle("show")
  async show() {
    // NOTE(2024-08-26 11:06:06 谭人杰): 此处加一下判断，因为app.vue 每次刷新时，win_loading在应用启动时，被关闭了， 所以这里win_loading不需要再次关闭
    if(!this.win_loading.isDestroyed()) {
      this.win_loading.hide();
      this.win_loading.close();
    }
    if (!this.win.isDestroyed()) {
      this.win.show();
    }
  }

  @IpcHandle("hide")
  async hide() {
    this.win.hide();
  }
}
