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
import { Post } from "./Post";
import { ICreateComment } from "../interfaces/comment.interface";

@Table({ tableName: "comments" })
export class Comment extends Model<Comment> {
  
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => Comment)
  @Column
  parentId: number;

  @BelongsTo(() => Comment, { foreignKey: 'parentId', as: 'parent' })
  parentComment: Comment;

  @HasMany(() => Comment, { foreignKey: 'parentId', as: 'replies' })
  replies: Comment[];

  
  public static async addComment(commentData: ICreateComment) {
    try {
      return await Comment.create(commentData);
    } catch (error) {
      throw error;
    }
  }


  public static async getAllComments() {
    try {
      return await Comment.findAll({
        include: [
          { model: User, attributes: ['id', 'first_name', 'last_name'] },
          { model: Post, attributes: ['id', 'title'] },
          { model: Comment, as: 'replies' }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  
  public static async getCommentById(id: number) {
    try {
      return await Comment.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'first_name', 'last_name'] },
          { model: Post, attributes: ['id', 'title'] },
          { model: Comment, as: 'replies' }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

 
  public static async updateCommentById(id: number, content: string) {
    try {
      const comment = await Comment.findByPk(id);
      if (comment) {
        await comment.update({ content });
        return comment;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }


  public static async deleteCommentById(id: number) {
    try {
      const comment = await Comment.findByPk(id);
      if (comment) {
        await comment.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
