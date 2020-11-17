import { Comment } from "./comment.model";
export interface Post {
  id?: number;
  title: string;
  comments?: Comment[];
}
