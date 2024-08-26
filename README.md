#### node 版本

- v20.14.0 | v20.9.0

#### npm 版本

- v10.1.0

#### python 版本

- v3.6.15

#### 为什么采用 sqlite3 数据库？

- 便于数据同步，在线模式下，可以从服务器上下载数据库文件
- 在离线模式下，服务将连接到本地数据库

#### 为什么前、后端采用 ipc 通信

- 考虑到离线模式下无网络环境，通过 ipc 通道进行前后端通信

#### 注意（强烈推荐使用 pnpm）

- 使用`pnpm`安装第三方包时，在执行时可能报错<font color="red">未指定全局包的安装路径，请按如下命令以此执行</font>

```
pnpm config set store-dir       D:\Tools\pnpm.pnpm-store
pnpm config set state-dir       D:\Tools\pnpm\state
pnpm config set global-dir      D:\Tools\pnpm\store
pnpm config set global-bin-dir  D:\Tools\pnpm
pnpm config set cache-dir       D:\Tools\pnpm\cache
```

#### 全局安装

```
{*} pnpm add -g @nestjs/cli@10.4.2 或 npm install -g @nestjs/cli@10.4.2 or
{*} pnpm add -g electron-rebuild@3.2.9 或 npm install -g electron-rebuild@3.2.9
{*} pnpm add -g typeorm-model-generator@0.4.6 或 npm install -g typeorm-model-generator@0.4.6
{*} pnpm add -g node-gyp@10.2.0 或 npm install -g node-gyp@10.2.0
{*} pnpm add -g --production windows-build-tools  或  npm install -g --production windows-build-tools 或
{*} npm install -g pnpm@9.6.0
```

<font color='red'>注意：安装 windows-build-tools，需要安装 c++编译环境</font>
<font color="red">注意：如果安装 sqlite3,里面内置了node-gyp@8.4.1</font>

#### 初始化

```
pnpm install
pnpm run sqlite3:rebuild        # 编译为适配当前环境的qlite
```

#### 启动

```
pnpm run dev 或npm run dev
```

#### 打包

```
pnpm run build 或 npm run build
```

#### 命令解释、

```
  // 开发环境
  "dev": "rimraf dist && vite",
  //调试模式
  "debug": "rimraf dist && vite -- --dsb-debug",

  // 打包
  "build": "rimraf dist && vue-tsc && vite build",

  // 依赖检测 electron与electron-builder版本是否匹配
  "postinstall": "electron-builder install-app-deps"，

  // 自动生成service、controller、module, 使用方式：
  // 使用方式：npm run res -- test
  "res": "cd ./src/main/nest/services && nest g --no-spec res",

  // 自动生成实体类
  "db": "typeorm-model-generator --noConfig true -d ./static/db/db.sqlite3 -e sqlite -o ./src/main/nest/entities --ce pascal --cp camel --cf none", 
  
  // 重新编译sqlite3模块
  "sqlite3:rebuild": "cd ./src/main && electron-rebuild -f -w sqlite3"
```

#### 访问

[swagger：http://localhost:3000/api-docs#/](http://localhost:3000/api-docs#/ "swagger地址")
[接口访问：http://localhost:3000/v1.0/接口路径](http://localhost:3000/v1.0/接口路径)

#### 举个栗子？

```
#preload.ts
contextBridge.exposeInMainWorld(
  'electron',
  # 定义一个可供前端访问的方法
  {
    # 通过 `ipcRenderer.invoke` 注册一个ipc通道`signIn`,并向这个通道发送消息
    signIn: (data: { username: string, password: string }): Promise<any> => ipcRenderer.invoke("signIn", data),
  },
)

#preload.d.ts
declare global {
  interface Window {
    electron: {
      signIn(data: { username: string, password: string }): Promise<any>,
    },
    isElectron: boolean
  }
}

#app.controller.ts
@isNoAuth()
@IpcHandle('signIn') # 通过注解的形式绑定ipc通道
signIn(@Payload() data: { username: string, password: string }) {
  return this.appService.signIn(data)
}

#account.vue
const onSignIn = async () => {
		// 调用
		const u = await signIn({
			username: state.ruleForm.userName,
			password: state.ruleForm.password,
		});
}
```

#### nestjs 生命周期

![system-framework](/static/frameworrk/nestjs.png "系统架构图")

#### 系统架构

![system-framework](/static/frameworrk/system-framework.png "系统架构图")

#### 数据同步实现逻辑

![offline](/static/frameworrk/offline.png "数据同步-在线模式")
![online](/static/frameworrk/sync.png "数据同步-离线模式")

#### 目录结构

```
└── .vscode                                     # vscode 配置文件
├──  dist/                                      # 生产环境/开发环境打包后的文件
│   ├── electron/                               # electron安装文件所在的目录
│   ├── main/                                   # nestJS打包后的目录
│   ├── preload/                                # electron预加载文件打包后的目录
│   ├── render/                                 # 前端打包后的目录
│
├── packages/                                        # 源代码目录
│   ├── backend/                                   # nestjs以及electron源代码目录
│   │   ├── common/                             # nestJs接口服务
│   │   |    ├── Dto                            # 接口校验类
│   │   |    ├── entities                       # 数据库实体类
│   │   |    ├── service                        # 接口服务实现
│   │   |    ├── types                          # 全局类型声明
│   │   |    ├── utils                          # 工具类
│   │   |    |    ├── auth/                     # JWT工具类
│   │   |    |    ├── decorator/                # 自定义装饰器
│   │   |    |    ├── Filter/                   # 自定义过滤器（统一网络错误返回结构）
│   │   |    |    ├── guard/                    # 自定义守卫类（JWT）
│   │   |    |    ├── interceptor/              # 自定义拦截器（统一数据返回的格式）
│   │   |    |    ├── middleWave/               # 自定义中间件
│   │   |    |    |   ├── logger/               # 全局日志输出（接口参数打印）
│   │   |    |    ├── pipe/                     # 自定义参数校验（DTO）
│   │   |    ├──  app.controller.ts             # nest接口控制器
│   │   |    ├──  app.module.ts                 # nest接口模块
│   │   |    ├──  app.service.ts                # nest接口服务
│   │   |
│   │   |    ├── config/                        # nestjs配置文件
│   │   |    ├── env                            # 环境变量
│   │   |    |    ├── common.ts                 # 服务监控配置文件
│   │   |    |    ├── dev                       # 开发环境的环境变量
│   │   |    |    ├── index                     # 根据当前环境判断使用生产环境的环境变量 or 开发环境变量
│   │   |    |    └── prod                      # 开发环境变量
│   │   |
|   │   ├── db/                                 # 数据库文件存放位置
│   │   |    └── db.sqlite3                     # sqlite3数据库文件
│   │   ├──  utils/                             # 工具类
│   │   ├──  app.controller.ts                  # nest主控制器
│   │   ├──  app.module.ts                      # nest主模块（初始化window）
│   │   ├──  app.service.ts                     # nest主服务
│   │   └──  index.ts                           # nest主入口文件(初始化ipc模块、接口服务)
|
│   └── preload/                                # electron预加载文件(全局ipc通道)
|
│   ├── frontend/                               # 前端源代码
│   │   ├── dist/                               # 打包后的文件
│   │   ├── public/                             # 公共资源预加载目录
│   │   ├── src/                                # 业务逻辑代码
│   │   |   ├── api/                            # 服务请求
│   │   |   ├── assets/                         # 静态资源目录
│   │   |   ├── components/                     # 通用组件封装
│   │   |   ├── directives/                     # 通用指令集
│   │   |   ├── il8n/                           # 国际化语言切换
│   │   |   ├── layout/                         # 框架整体布局设计
│   │   |   ├── router/                         # 路由封装
│   │   |   ├── stores/                         # 状态管理器
│   │   |   ├── theme/                          # 主题颜色
│   │   |   ├── types/                          # 全局类型声明
│   │   |   ├── utils/                          # 自定义的工具类
│   │   |   ├── views/                          # 业务页面
│   │   |   ├── App.vue                         # 根组件
│   │   |   └── main.ts                         # 入口文件
│   │   ├── .env                                # 生产环境与开发环境共用的环境变量
│   │   ├── .env.development                    # 开发环境变量
│   │   ├── .env.production                     # 生产环境变量
│   │   ├── .eslintignore                       # 需要警用eslint规则的文件
│   │   ├── .eslintrc.js                        # eslint规则
│   │   ├── .gitignore                          # git提交忽略的文件
│   │   ├── .prettierrc.js                      # prettier插件代码格式化规则（prettier是vsCode编辑器的插件）
│   │   ├── index.html                          # 渲染进程入口HTML文件
│   │   ├── package.json                        # 包依赖管理文件
│   │   ├── tsconfig.json                       # ts配置文件
│   │   └── vite.config.ts                      # vite配置文件
│   │
|
└── .npmrc                                      # npm配置文件
└── electron-builder.config.js                  # electron打包配置文件
└── electron-builder.md                         # electron打包配置教程
└── package.json                                # 包依赖管理文件
└── pnpm-workspace.yaml                         # 指定pnpm包的工作目录
└── README.md                                   # 框架说明
```

#### 其他说明

- package.json:
  - // "@typescript-eslint/eslint-plugin": "^5.46.0",
  - // "@typescript-eslint/parser": "^5.46.0",
  - // "eslint-plugin-vue": "^9.8.0",

D:\Tools\nvm\v20.9.0\node_modules\pnpm\bin\pnpm.cjs
