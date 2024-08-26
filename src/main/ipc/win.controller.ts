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
    this.win_loading.hide();
    this.win_loading.close();
    if (!this.win.isDestroyed()) {
      console.log(12312323);
      
      this.win.show();
    }
  }

  @IpcHandle("hide")
  async hide() {
    this.win.hide();
  }
}
