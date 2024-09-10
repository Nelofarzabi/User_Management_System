import {
    Table,
    Model,
    AutoIncrement,
    PrimaryKey,
    Column,
    AllowNull,
    HasMany,
    BelongsToMany,
    Scopes,
  } from "sequelize-typescript";
import { UserRole } from "./UserRole";
import { User } from "./User";
import { RolePermission } from "./RolePermission";
import { Permission } from "./Permission";

@Scopes(() => ({
  withPermissions: {
    include: [
      {
        model: Permission,
        through: { attributes: [] }, 
      },
    ],
  },
}))
  
  @Table({ tableName: "roles" })
  export class Role extends Model<Role> {
  
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;
  
    @AllowNull(false)
    @Column
    role_name: string;
  
    @Column
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
  
    @BelongsToMany(() => Permission, () => RolePermission)
    permissions: Permission[];
}
  