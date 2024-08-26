/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: "com.hman.app", //包名
  productName: "HelmsMan", //软件名称
  directories: {
    output: "dist/electron",
  },
  publish: null,
  npmRebuild: false,
  files: [
    "dist/main/**/*",
    "dist/preload/**/*",
    "dist/render/**/*",
    "static/frameworrk/**/*",
    "static/logs/**/*"
  ],
  nsis: {
    oneClick: false, // 是否需要点击安装，自动更新需要关掉
    allowToChangeInstallationDirectory: true, //是否能够选择安装路径
    perMachine: true, // 是否需要辅助安装页面
    deleteAppDataOnUninstall: true,
    installerIcon: "static/icons/setup.ico", // 安装图标
    uninstallerIcon: "static/icons/setup.ico", //卸载图标
    installerHeaderIcon: "static/icons/setup.ico", // 安装时头部图标
    createDesktopShortcut: true, // 创建桌面图标
    createStartMenuShortcut: true, // 创建开始菜单图标
    shortcutName: "HelmsMan", //安装后 软件名称
    allowElevation: true, // 允许安装时，请求提升权限
    // "include": "build/script/installer.nsh", // 包含的自定义nsis脚本 这个对于构建需求严格得安装过程相当有用。
  },
  win: {
    icon: "static/icons/icon.png",
    requestedExecutionLevel: 'requireAdministrator', //highestAvailable 可用的最高权限 或 requireAdministrator 管理员权限
    target: [
      {
        target: "nsis",
        // arch: ["x64"],
      },
    ],
  },
  extraResources: [
    {
      from: "static/db/db.sqlite3",
      to: "../resources/db/db.sqlite3",
    },
    {
      from: "static/loading.html",
      to: "../resources/html/loading.html",
    },
  ],
};

module.exports = config;
