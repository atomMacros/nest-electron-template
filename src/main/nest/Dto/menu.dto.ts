import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
  @ApiProperty({
    description: '唯一标识',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '菜单标题',
    example: 'Dashboard',
  })
  title: string;

  @ApiProperty({
    description: '路由名称',
    example: 'dashboard',
  })
  name: string;

  @ApiProperty({
    description: '路由路径',
    example: '/dashboard',
  })
  path: string;

  @ApiProperty({
    description: '重定向地址',
    example: '/dashboard',
    nullable: true,
  })
  redirect?: string | null;

  @ApiProperty({
    description: '菜单图标',
    example: 'setting',
    nullable: true,
  })
  icon?: string | null;

  @ApiProperty({
    description: '组件路径',
    example: 'DashboardComponent',
  })
  component: string;

  @ApiProperty({
    description: '外链菜单',
    example: 'http://example.com',
    nullable: true,
  })
  externalLink?: string | null;

  @ApiProperty({
    description: '按钮权限',
    example: '查看,编辑',
    nullable: true,
  })
  buttons?: string | null;

  @ApiProperty({
    description: '排序号',
    example: 1,
  })
  sortNumber: number;

  @ApiProperty({
    description: '是否隐藏',
    example: 0,
  })
  hidden: number;

  @ApiProperty({
    description: '是否缓存',
    example: 1,
  })
  cache: number;

  @ApiProperty({
    description: '是否固定',
    example: 0,
  })
  affix: number;

  @ApiProperty({
    description: '是否内嵌iframe',
    example: 1,
  })
  isIframe: number;

  @ApiProperty({
    description: '创建者',
    example: 'admin',
    nullable: true,
  })
  createBy?: string | null;

  @ApiProperty({
    description: '更新时间',
    example: '2024-08-15 12:00:00',
  })
  updateTime: string;

  @ApiProperty({
    description: '创建时间',
    example: '2024-08-15 12:00:00',
  })
  createTime: string;

  @ApiProperty({
    description: '父级菜单ID',
    example: 0,
  })
  pId: number;
}