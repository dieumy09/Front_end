import { Role } from './role';
import { Post } from './post';
export interface User {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  status: boolean;
  activated: boolean;
  roles: any[];
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
}
