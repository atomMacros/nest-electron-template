import { SysUserEntity } from "../../entities/sys_user";
import { encryptPassword } from "../../../utils";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SysUserEntity) private readonly userRepository: Repository<SysUserEntity>,
    private readonly jwtService: JwtService
  ) {}

  /* 检查用户是否已存在 + 校验密码 */
  async validateUser(account: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        account,
      }
    })
    if (user) {
      const pwd =  encryptPassword(password, user.salt)
      return pwd == user.password ? user : null;
    }
    return null;
  }

  /**
   * @path: packages\backend\src\common\services\auth\auth.service.ts 
   * @functionName  注册TOKEN
   * @param {} 
   * @description 注册TOKEN
   * @author 谭人杰
   * @date 2024-08-17 14:42:40
  */
  async getToken(id: string | number, account: string, role: number) {
    const payload = { account, role, id };
    let token = await this.jwtService.signAsync(payload);
    return token
  }
}
