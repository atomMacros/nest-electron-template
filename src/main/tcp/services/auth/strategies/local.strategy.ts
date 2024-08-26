import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
      	// 还可以定制我们自己的用户名和密码字段，如下：
      	// 如果还有其他需求，可查看Strategy类的定义和使用方法
      	super({
          usernameField: 'account',
          passwordField: 'password',
        })
    }
	// 要实现的验证函数，固定写法
    async validate(account: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(account, password);
        if (!user) {
            throw new UnauthorizedException('用户不存在');
        }
        return user;
    }
}