import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_menu")
export class SysMenuEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "path" })
  path: string;

  @Column("text", { name: "redirect", nullable: true })
  redirect: string | null;

  @Column("text", { name: "icon", nullable: true })
  icon: string | null;

  @Column("text", { name: "component" })
  component: string;

  @Column("text", { name: "ExternalLink", nullable: true })
  externalLink: string | null;

  @Column("text", { name: "buttons", nullable: true })
  buttons: string | null;

  @Column("integer", { name: "sortNumber", nullable: true, default: () => "0" })
  sortNumber: number | null;

  @Column("integer", { name: "hidden", nullable: true, default: () => "0" })
  hidden: number | null;

  @Column("integer", { name: "cache", nullable: true, default: () => "0" })
  cache: number | null;

  @Column("integer", { name: "affix", nullable: true, default: () => "0" })
  affix: number | null;

  @Column("integer", { name: "isIframe", nullable: true, default: () => "0" })
  isIframe: number | null;

  @Column("text", { name: "createBy", nullable: true })
  createBy: string | null;

  @Column("text", {
    name: "updateTime",
    default: () => "strftime('%Y-%m-%d %H:%M:%S', 'now')",
  })
  updateTime: string;

  @Column("text", {
    name: "createTime",
    default: () => "strftime('%Y-%m-%d %H:%M:%S', 'now')",
  })
  createTime: string;

  @Column("integer", { name: "pId" })
  pId: number;
}
