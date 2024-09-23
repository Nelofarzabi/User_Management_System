export interface ICreateComment {
    content: string;
    userId: number;
    postId: number;
    parentId?: number; 
  }
  