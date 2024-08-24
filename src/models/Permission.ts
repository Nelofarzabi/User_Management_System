import {
    Table,
    Model,
    AutoIncrement,
    PrimaryKey,
    Column,
    AllowNull,
    BelongsToMany,
  } from "sequelize-typescript";
import { Role } from "./Role";
import { RolePermission } from "./RolePermission";
  
  @Table({ tableName: "permissions" })
  export class Permission extends Model<Permission> {
  
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;
  
    @AllowNull(false)
    @Column
    permission_name: string;
  
    @Column
    description: string;

    @BelongsToMany(() => Role, () => RolePermission)
    roles: Role[];
  
  }
  