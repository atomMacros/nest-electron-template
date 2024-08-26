import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport/dist";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { SysUserEntity } from "../../entities/sys_user";
import { JwtAuthGuard } from "../../utils/guard/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { NetworkGuard } from "../../utils/guard/network.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([SysUserEntity]),
    // PassportModule,
    PassportModule.register({ defaultStrategy: "jwt" }), // 默认策略\
    // NOTE(2024-08-12 16:19:21 谭人杰): JWT 权限认证
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (connfigService: ConfigService) => {
        return connfigService.get("jwt_config");
      },
    }),
  ],
  // JwtStrategy and LocalStrategy
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: NetworkGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
