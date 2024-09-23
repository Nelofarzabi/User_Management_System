import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { Comment } from './Comment';
import { ICreatePost } from "../interfaces/post.interface";

@Table({ tableName: "posts" })
export class Post extends Model<Post> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

 

  public static async createPost(postData: ICreatePost) {
    try {
      return await Post.create(postData);
    } catch (error) {
      throw error;
    }
  }

  public static async getAllPosts() {
    try {
      return await Post.findAll({ include: [Comment, User] });
    } catch (error) {
      throw error;
    }
  }

  public static async getPostById(id: number) {
    try {
      const post = await Post.findByPk(id, { include: [Comment, User] });
      if (post) {
        return post;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  public static async updatePostById(id: number, updatedData: Partial<ICreatePost>) {
    try {
      const post = await Post.findByPk(id);
      if (post) {
        await post.update(updatedData);
        return post;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  public static async deletePostById(id: number) {
    try {
      const post = await Post.findByPk(id);
      if (post) {
        await post.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  
}
