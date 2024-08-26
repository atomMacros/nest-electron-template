
import { Injectable, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SysMenuEntity } from "../../entities/sys_menu";
import { MenuDto } from "../../Dto/menu.dto";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(SysMenuEntity)
    private readonly menuRepository: Repository<SysMenuEntity>
  ) {}
  async create(menu: MenuDto, req) {
    const menuEntity = new SysMenuEntity();
    menuEntity.title = menu.title;
    menuEntity.name = menu.name;
    menuEntity.path = menu.path;
    menuEntity.redirect = menu.redirect;
    menuEntity.icon = menu.icon;
    menuEntity.pId = menu.pId;
    menuEntity.component = menu.component;
    menuEntity.sortNumber = menu.sortNumber;
    menuEntity.externalLink = menu.externalLink;
    menuEntity.affix = menu.affix;
    menuEntity.hidden = menu.hidden;
    menuEntity.cache = menu.cache;
    menuEntity.buttons = menu.buttons;
    menuEntity.isIframe = menu.isIframe;
    menuEntity.createBy = req.user.username
    const res = await this.menuRepository.save(menuEntity);
    return this.menuRepository.findOneBy({ id: res.id });
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
