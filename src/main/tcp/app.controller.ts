import { Body, Controller, Get, Param, Post, Query, Req, Res, Session, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isNoAuth } from './utils/decorator/jwt.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}
}
