import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  Unique,
  HasMany,
  Scopes,
  BelongsToMany,
} from "sequelize-typescript";
import { ICreateUser } from "../interfaces/user.interface";
import { UserRole } from "./UserRole";
import { Role } from "./Role";
import { Post } from './Post';
import { Comment } from './Comment';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/jwtservices';

@Scopes(() => ({
  withRoles: {
    include: [
      {
        model: Role,
        through: { attributes: [] }, 
      },
    ],
  },
}))

@Table({ tableName: "user" })
export class User extends Model<User> {
  
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  first_name: string;

  @Column
  last_name: string;


  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

    
  @HasMany(() => Post)
  posts: Post[];
  
  @HasMany(() => Comment)
  comments: Comment[];

  public async addUser(user:ICreateUser){
    try {
        return await User.create(user);
      } catch (error) {
        console.log(error);
        throw error;
      }
  }

  public static  async getAllUser() {
    try {
      return await User.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public static async deleteUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public static async updateUserById(id: number, updatedData: Partial<ICreateUser>) {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.update(updatedData);
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  public async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  public async generateAuthToken() {
    return generateToken(this.id);
  }

}




// public async getUserById(id: number) {
  //   try {
  //     return await User.findOne({
  //       where: { id: id },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }