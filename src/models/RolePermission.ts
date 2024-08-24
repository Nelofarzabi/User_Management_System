import {
    Table,
    Model,
    ForeignKey,
    Column,
    BelongsTo,
  } from "sequelize-typescript";
  import { Role } from "./Role";
  import { Permission } from "./Permission";
  
  @Table({ tableName: "role_permissions" })
  export class RolePermission extends Model<RolePermission> {
  
    @ForeignKey(() => Role)
    @Column
    role_id: number;
  
    @ForeignKey(() => Permission)
    @Column
    permission_id: number;

    @BelongsTo(() => Role)
    role: Role;

    @BelongsTo(() => Permission)
    permission: Permission;
  }
  