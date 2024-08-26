import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';
import CommonConfig from "../config/env/common";
import { AuthModule } from './services/auth/auth.module';
import { JwtAuthGuard } from './utils/guard/auth.guard';
// import { UserModule } from './services/user/user.module';

import { configModule } from '../config';
import { UserModule } from './services/user/user.module';
import { MenuModule } from './services/menu/menu.module';
@Module({
  imports: [
    // NOTE(2024-08-12 16:10:33 谭人杰): 8、数据库配置
    TypeOrmModule.forRootAsync({
      imports: [configModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('sqlite');
      },
    }),
    AuthModule,
    UserModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
