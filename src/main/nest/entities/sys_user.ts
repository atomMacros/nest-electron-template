import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_user")
export class SysUserEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "account" })
  account: string;

  @Column("text", { name: "username" })
  username: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "salt" })
  salt: string;

  @Column("text", { name: "avatar", nullable: true })
  avatar: string | null;

  @Column("integer", { name: "dep", nullable: true })
  dep: number | null;

  @Column("integer", { name: "role", nullable: true })
  role: number | null;

  @Column("text", { name: "token", nullable: true })
  token: string | null;

  @Column("text", {
    name: "createTime",
    default: () => "strftime('%Y-%m-%d %H:%M:%S', 'now')",
  })
  createTime: string;

  @Column("text", {
    name: "updateTime",
    default: () => "strftime('%Y-%m-%d %H:%M:%S', 'now')",
  })
  updateTime: string;
}
