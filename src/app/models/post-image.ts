import {Post} from './post';

export interface PostImage {
  id: number;
  image: string;
  post: Post;
  status: boolean;
}
