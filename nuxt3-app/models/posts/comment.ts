import { User } from './../user';

// A comment on a certain post
export interface CommentInterface {
  id?: number;
  itemId: number;
  comment: string;
  createdAt: string;
  poster: User;
}

export class Comment implements CommentInterface {
  id?: number;
  itemId: number;
  comment: string;
  createdAt: string;
  poster: User;
  endpoint?: string;

  constructor(comment: CommentInterface) {
    this.id = comment.id;
    this.itemId = comment.itemId;
    this.comment = comment.comment;
    this.createdAt = comment.createdAt;
    this.poster = comment.poster;
    this.endpoint = `news/items/${this.itemId}/comments`;
  }
}
