import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: '用户ID' })
  id: number;

  @ApiProperty({ description: '账号' })
  account: string;

  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '加密盐' })
  salt: string;

  @ApiProperty({ description: '头像', required: false })
  avatar?: string | null;

  @ApiProperty({ description: '部门', required: false })
  dep?: number | null;

  @ApiProperty({ description: '角色', required: false })
  role?: number | null;

  @ApiProperty({ description: '登录令牌', required: false })
  token?: string | null;

  @ApiProperty({ description: '创建时间' })
  createTime: string;

  @ApiProperty({ description: '更新时间' })
  updateTime: string;
}