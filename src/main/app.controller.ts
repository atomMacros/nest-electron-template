import { Controller } from '@nestjs/common'
import { Window } from '@doubleshot/nest-electron'
import type { BrowserWindow } from 'electron'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Window() private readonly mainWin: BrowserWindow,
  ) { }
  // @isNoAuth()
  // @IpcHandle('msg')
  // public handleSendMsg(@Payload() msg: string): Observable<string> {
  //   const { webContents } = this.mainWin
  //   webContents.send('reply-msg', `【nestJS已收到消息，通过IPC通道回复消息1】${ msg }`)
  //   webContents.send('reply-msg', `【nestJS已收到消息，通过IPC通道回复消息2】${ msg }`)
  //   return of(`【nestJS已收到消息，通过异步事件回复消息】 ${msg}`)
  // }
}
