import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private authService: AuthService,
    ) {
        super({
            usernameField: 'account',
            passwordField: 'password',
          	// 如何提取令牌
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
          	// 是否忽略令牌过期
            ignoreExpiration: false,
          	// 解析令牌的密钥
            secretOrKey: configService.get('jwt_config').secret,
        });
    }
		// 要实现的验证函数，固定写法
    async validate(payload): Promise<any> {
      console.log('JwtStrategy-validate========================', payload);
      return payload
  }
}