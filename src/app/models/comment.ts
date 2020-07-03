import { Post } from './post';
export interface Comment {
  id: number;
  content: string;
  status: boolean;
  post: Post;
  createdAt: Date;
  updatedAt: Date;
}
