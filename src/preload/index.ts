import { contextBridge, webFrame, ipcRenderer } from 'electron'

function getDeviceScaleFactor(): Promise<number> {
  return ipcRenderer.invoke("device-scale-factor")
}

contextBridge.exposeInMainWorld(
  'electron',
  {
    useZoomFactor: () => {
      const DESIGN_HEIGHT = 1080
      const DESIGN_DPR = 1
      const DESIGN_SCALE_FACTOR = 1
      let scaleFactor = 0

      const update = async () => {
        const height = window.innerHeight
        const dpr = window.devicePixelRatio
        if (scaleFactor === 0) scaleFactor = await getDeviceScaleFactor()
        const factor = (height / DESIGN_HEIGHT) * (dpr / DESIGN_DPR) * (DESIGN_SCALE_FACTOR / scaleFactor)
        webFrame.setZoomFactor(factor)
      }
      return {
        update
      }
    },
    saveImageToFile: (image: string): Promise<any> => ipcRenderer.invoke("save-image", image),
  },
)

contextBridge.exposeInMainWorld(
  'session',
  {
    setItem: (key: string, value: any): Promise<any> => ipcRenderer.invoke("session/setItem", key, value),
    getItem: (key: string): Promise<any> => ipcRenderer.invoke("session/getItem", key),  // NOTE(2024-08-17 18:14:54 谭人杰): 根据 key 获取数据
    delItem: (key: string): Promise<any> => ipcRenderer.invoke("session/delItem", key),// NOTE(2024-08-17 18:13:29 谭人杰): 根据 key 删除数据
    clear: (): Promise<any> => ipcRenderer.invoke("session/clear"), // NOTE(2024-08-17 18:13:44 谭人杰): 清楚所有数据
    isExist: (key: string): Promise<Boolean> => ipcRenderer.invoke("session/isExist", key), // NOTE(2024-08-17 18:13:44 谭人杰): 判断 key 是否存在
  }
)

contextBridge.exposeInMainWorld(
  'win',
  {
    show: (): Promise<any> => ipcRenderer.invoke("win/show"),
    hide: (): Promise<any> => ipcRenderer.invoke("win/hide"),
  }
)


contextBridge.exposeInMainWorld(
  'isElectron',
  true
)
