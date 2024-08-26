import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { app, BrowserWindow, globalShortcut, Menu, nativeImage, Tray } from "electron";
import { ElectronIpcTransport } from "@doubleshot/nest-electron";
import { AppModule } from "./app.module";
import { AppModule as ApiModule } from "./tcp/app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { logger } from "./tcp/utils/middleWave/logger/logger.middleWave";
import { HttpCatchFilter } from "./tcp/utils/Filter/HttpCatchFilter";
import TransformInterceptor from "./tcp/utils/interceptor/transform.interceptor";
import ValidatePipe from "./tcp/utils/pipe/validate.pipe";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

async function electronAppInit() {
  const isDev = !app.isPackaged;
  app.on("window-all-closed", () => {
    globalShortcut.unregisterAll();
    if (process.platform !== "darwin") app.quit();
  });

  if (isDev) {
    if (process.platform === "win32") {
      process.on("message", (data) => {
        if (data === "graceful-exit") app.quit();
      });
    } else {
      process.on("SIGTERM", () => {
        app.quit();
      });
    }
  }
  await app.whenReady().then((res) => {
   
  });
  const nestApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new ElectronIpcTransport(),
    }
  );
  await nestApp.listen();
}

const nestApp = async function () {
  const nestapp = await NestFactory.create<NestExpressApplication>(ApiModule, {
    cors: true,
  });
  // NOTE(2024-08-12 15:36:52 谭人杰): 1、开启版本控制
  nestapp.enableVersioning({
    type: VersioningType.URI,
  });
  // NOTE(2024-08-12 15:36:41 谭人杰): 2、开启swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("接口文档")
    .setDescription("接口文档")
    .setVersion("1.0")
    .addBearerAuth() // 注意此处：文档添加BearerAuth
    .build();
  const document = SwaggerModule.createDocument(nestapp, options);
  SwaggerModule.setup("/api-docs", nestapp, document);
  // NOTE(2024-08-12 15:37:58 谭人杰): 3、开启日志
  nestapp.use(logger);
  // NOTE(2024-08-12 15:39:01 谭人杰): 4、开启全局异常过滤器
  nestapp.useGlobalFilters(new HttpCatchFilter());
  // NOTE(2024-08-12 15:40:37 谭人杰): 5、开启全局拦截器--同一返回格式
  nestapp.useGlobalInterceptors(TransformInterceptor);
  // NOTE(2024-08-12 15:41:04 谭人杰): 6、开启全局管道--参数校验
  nestapp.useGlobalPipes(ValidatePipe);
  //NOTE(@date:2023-04-22 14:43:25 谭人杰): 7、session配置
  await nestapp.listen(3000);
};

async function bootstrap() {
  try {
    await electronAppInit();
    await nestApp();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    app.quit();
  }
}

bootstrap();
