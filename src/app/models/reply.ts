export interface Reply {
  id: number;
  content: string;
  status: boolean;
  comment: Comment;
  createdAt: Date;
  updatedAt: Date;
}
