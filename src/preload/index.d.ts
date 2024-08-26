declare global {
  interface Window {
    electron: {
      useZoomFactor(): { update: () => Promise<void> }
      saveImageToFile(image: string): Promise<any>
    },
    isElectron: boolean,
    session: {
      getItem(key: string): Promise<any>
      setItem(key: string, value: any): Promise<any>
      delItem(key: string): Promise<any>
      clear(): Promise<any>
      isExist(key: string): Promise<boolean>
    },
    win: {
      show(): Promise<any>
      hide(): Promise<any>
    }
  }
}

export { }