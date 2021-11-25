import { Comment } from './comment';
import { HasPhoto, PhotoMetaData } from './../hasPhoto';

// The user that posted the post
export class Poster extends HasPhoto {
  userId: number;
  fullName?: string;
  groupName?: string;

  constructor(
    userId: number,
    fullName?: string,
    groupName?: string,
    photoMetaData?: PhotoMetaData
  ) {
    super(photoMetaData);
    this.userId = userId;
    this.fullName = fullName;
    this.groupName = groupName;
  }
}

// Types of posts
export type PostType = 'blog' | 'image' | 'video';

// A card can be a blogpost, poll, photos etc.
export interface PostInterface {
  id: number;
  title: string;
  poster: Poster;
  content: string;
  posterType: 'user' | 'group';
  category: { id: number; name: string };
  comments: Comment[];
  likedBy: number[];
  photoMetaData?: PhotoMetaData;
  createdAt: string;
  updatedAt: string;
  datePosted: string;
  type?: PostType;
}

export abstract class Post extends HasPhoto implements PostInterface {
  id: number;
  title: string;
  poster: Poster;
  content: string;
  posterType: 'user' | 'group';
  category: { id: number; name: string };
  comments: Comment[];
  likedBy: number[];
  createdAt: string;
  updatedAt: string;
  datePosted: string;
  type: PostType;

  constructor(post: PostInterface) {
    super(post.photoMetaData);

    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.posterType = post.posterType;
    this.category = post.category;
    this.comments = post.comments;
    this.likedBy = post.likedBy;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;

    this.poster = new Poster(
      post.poster.userId,
      post.poster?.fullName,
      post.poster?.groupName,
      post.poster.photoMetaData
    );
    this.type = post.type || 'blog';
    this.datePosted = new Date(this.createdAt).toLocaleString();
  }

  author(): string {
    if (this.poster === undefined) return 'Onbekend';
    return this.poster.fullName || this.poster.groupName || 'Onbekend';
  }
}

export abstract class Posts {
  posts: Post[];

  constructor(posts: Post[]) {
    this.posts = posts;
  }
}
