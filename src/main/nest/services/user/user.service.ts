
import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SysUserEntity } from "../../entities/sys_user";
import { encryptPassword, generateSalt } from "../../../utils";
import { UserDto } from "../../Dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SysUserEntity)
    private readonly userRepository: Repository<SysUserEntity>,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
		private readonly configService: ConfigService
  ) {}

  /**
   * @path: packages\backend\src\common\services\user\user.service.ts 
   * @functionName 验证token，无效则更新TOKEN，最后返回新的token
   * @param { string } token
   * @param { number } id
   * @param { string } account 
   * @param { string } role 
   * @description 
   * @author 谭人杰
   * @date 2024-08-17 15:07:12
  */
  async updateToken(user: UserDto) {
    let token = user.token
    try {
			await this.jwtService.verifyAsync(user.token, {
				secret: this.configService.get('jwt_config').secret,
			});
		} catch (error) {
			token = await this.authService.getToken(user.id, user.account, user.role);
      this.userRepository.update({ id: user.id }, { token })
		}
    return token
  }

  findById(id: number) {
    let s = generateSalt();
    return this.userRepository.findOne({
      where: { id },
    });
  }
  async createUser(user: UserDto) {
    let u = await this.userRepository.findOne({
      where: { account: user.account },
    });
    if(u) {
      throw new HttpException('用户已存在', 500)
    }
    const temp = new SysUserEntity();
    temp.account = user.account;
    temp.salt = generateSalt();
    temp.password = encryptPassword(user.password, temp.salt);
    return this.userRepository.save(temp);
  }
}
