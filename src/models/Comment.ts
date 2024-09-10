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
}
