import { Region } from './region';
import { User } from './user';
import { Direction } from './direction';
import { PostType } from './post-type';
import { PostImage } from './post-image';
import { Category } from './category';

export interface Post {
  id: number;
  title: string;
  condition: boolean;
  address: string;
  area: number;
  price: number;
  deal: boolean;
  viewCount: number;
  content: string;
  status: boolean;
  approved: boolean;
  user: User;
  category: Category;
  postImage: PostImage;
  postType: PostType;
  direction: Direction;
  createdAt: Date;
  updatedAt: Date;
  region: Region;
  customerType: boolean;
}
