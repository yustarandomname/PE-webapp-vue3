import { Comment } from './comment';
import { HasPhoto, PhotoMetaData } from './../hasPhoto';
import { NuxtApp } from './../nuxtApp';

// The user that posted the post
export class Poster extends HasPhoto {
  userId: number;
  fullName?: string;
  groupName?: string;
  firstName: string;

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
    this.firstName = fullName?.split(' ')[0] || 'Onbekend';
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
  endpoint: string;
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
  endpoint: string = 'news/items';

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

  // LIKES
  like(nuxtApp: NuxtApp): void {
    nuxtApp.$httpClient({
      method: 'POST',
      url: `v1/${this.endpoint}/${this.id}/like`,
    });
    const userId = nuxtApp.$user.value.userId;
    this.likedBy.push(userId);
  }

  unlike(nuxtApp: NuxtApp): void {
    nuxtApp.$httpClient({
      method: 'DELETE',
      url: `v1/${this.endpoint}/${this.id}/like`,
    });
    const userId = nuxtApp.$user.value.userId;
    this.likedBy = this.likedBy.filter((id) => id !== userId);
  }

  toggleLike(nuxtApp: NuxtApp): void {
    if (!nuxtApp?.$user?.value.userId) return console.log('no nuxtApp');

    const userId = nuxtApp.$user.value.userId;
    if (this.likedBy.includes(userId)) {
      this.unlike(nuxtApp);
      return;
    }

    this.like(nuxtApp);
  }

  // COMMENTS
  //TODO: add comments

  // SHARE
  canShare(): boolean {
    return !!navigator?.share;
  }

  // TODO: check if this works
  async share(e: Event) {
    if (!e || !this.canShare()) return;

    const shareData = {
      title: this.title,
      text: this.content,
      url: 'localhost:8000', // TODO: get url from env
    };

    navigator.share(shareData);
  }
}

export abstract class Posts {
  posts: Post[];

  constructor(posts: Post[]) {
    this.posts = posts;
  }
}
