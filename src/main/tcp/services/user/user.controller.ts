import { JwtService } from '@nestjs/jwt';
import { Controller, Get, Post, Res, Query, UseGuards, Request, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { isNoAuth } from '../../utils/decorator/jwt.decorator';
import { UserDto } from '../../Dto/user.dto';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';
@ApiTags('用户管理')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@isNoAuth()
	@UseGuards(AuthGuard('local'))
	@Post('login')
	@ApiOperation({
		summary: '登录',
	})
	async login(@Request() req, @Query() params: UserDto) {
		// req的user属性，是在passport-local身份验证流程中由Passport填充的
		let user = { ...req.user };
		let token = await this.userService.updateToken(user);
		return {
			...user,
			token,
		};
	}

	@Get('getUserInfo/:id')
	@ApiOperation({
		summary: '根据ID获取用户信息',
	})
	async getUserInfo(@Req() req) {
		console.log(req['net']);
		let id = req.params.id;
		let user = await this.userService.findById(id);
		return user;
	}
	@Post('createUser')
	@ApiOperation({
		summary: '新增用户',
	})
	async createUser(@Query() user: UserDto) {
		return await this.userService.createUser(user);
	}
}
