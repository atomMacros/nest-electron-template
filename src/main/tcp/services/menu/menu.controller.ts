import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuDto } from '../../Dto/menu.dto';

@ApiTags('菜单')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: "新增菜单"
  })
  @Post('add')
  create(@Body() createMenuDto: MenuDto, @Req() req) {
    return this.menuService.create(createMenuDto, req);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: MenuDto) {
    return this.menuService.update(+id, );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
