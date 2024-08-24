import {
    Table,
    Model,
    ForeignKey,
    Column,
    BelongsTo,
  } from "sequelize-typescript";
  import { User } from "./User";
  import { Role } from "./Role";
  
  @Table({ tableName: "user_roles" })
  export class UserRole extends Model<UserRole> {
  
    @ForeignKey(() => User)
    @Column
    user_id: number;
  
    @ForeignKey(() => Role)
    @Column
    role_id: number;


    @BelongsTo(() => User)
    user: User;
  
    @BelongsTo(() => Role)
    role: Role;
  }
  