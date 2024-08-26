//   /src/common/guards/auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import CommonConfig from "../../../config/env/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
    private jwtService: JwtService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>> JwtAuthGuard  start>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const isNoAuth = this.reflector.getAllAndOverride("isNoAuth", [
      //NOTE(@date:2023-04-26 10:17:47 谭人杰): 获取那个controller被执行了
      context.getHandler(),
      context.getClass(),
    ]);
    let request = context.switchToHttp().getRequest();
    if (isNoAuth || request.url == CommonConfig.statusMonitorConfig.path)
      return true;
    const token = this.extractTokenFromHeader(request);
    console.log('token=======================', token);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 验证失败将抛出异常，进入到catch中，
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("jwt_config").secret,
      });
      console.log('verifyAsync=======================', payload);
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>> JwtAuthGuard  end>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    return true;
  }

  private extractTokenFromHeader(
    request: Request & { headers }
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
