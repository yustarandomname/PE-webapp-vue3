import { useNuxtApp } from '#app';
import { HasPhoto, PhotoMetaData } from '../hasPhoto';
import { ResData } from '../response';
import { Blog } from './blog';
import { Comment, CommentInterface } from './comment';

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
  id?: number;
  title: string;
  poster: Poster;
  content: string;
  posterType: 'user' | 'group';
  category?: { id: number; name: string };
  comments: Comment[];
  likedBy: number[];
  photoMetaData?: PhotoMetaData;
  createdAt: string;
  updatedAt: string;
  datePosted: string;
  type?: PostType;
}

export class Post extends HasPhoto implements PostInterface {
  id: number;
  title: string;
  poster: Poster;
  content: string;
  posterType: 'user' | 'group';
  category?: { id: number; name: string };
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

  static async fetchNext(pageSize: number): Promise<Post[]> {
    // TODO: implement pagination here
    const { $httpClient } = useNuxtApp();
    const { data } = (await $httpClient('v1/news/items')) as ResData<
      PostInterface[]
    >;
    console.log(data);

    // if status is not 200
    if (data?.status != 'ok') return [];

    // data: {status: 'ok', data: Post[]}
    return [];
    // return data.data.map((p) => Blog.init(p));
    // return data.data.map((post: PostInterface) => {
    //   switch (post.type) {
    //     default:
    //       return new Blog(post);
    //   }
    // });
  }

  // LIKES
  like(): void {
    const { $httpClient, $user } = useNuxtApp();

    $httpClient({
      method: 'POST',
      url: `v1/${this.endpoint}/${this.id}/like`,
    });
    const userId = $user.value.userId;
    this.likedBy.push(userId);
  }

  unlike(): void {
    const { $httpClient, $user } = useNuxtApp();

    $httpClient({
      method: 'DELETE',
      url: `v1/${this.endpoint}/${this.id}/like`,
    });
    const userId = $user.value.userId;
    this.likedBy = this.likedBy.filter((id) => id !== userId);
  }

  toggleLike(): void {
    const { $user } = useNuxtApp();
    if (!$user?.value.userId) return console.log('no nuxtApp');

    const userId = $user.value.userId;
    if (this.likedBy.includes(userId)) {
      this.unlike();
      return;
    }

    this.like();
  }

  // COMMENTS
  async comment(comment: string) {
    const { $user, $httpClient } = useNuxtApp();
    if (!comment) return; // if no comment content -> no comment

    const content: CommentInterface = {
      itemId: this.id,
      comment,
      poster: $user.value,
      createdAt: new Date().toString(),
    };

    const { data } = (await $httpClient(
      `v1/${this.endpoint}/${this.id}/comments`,
      {
        method: 'POST',
        data: content,
      }
    )) as ResData<CommentInterface>;

    if (data.status != 'ok') return Error(data.message);

    const newComment = new Comment(data.data as CommentInterface);
    this.comments.push(newComment);
    return newComment;
  }

  async deleteComment(commentId?: number) {
    const { $user, $httpClient } = useNuxtApp();
    if (!commentId) return;

    if ($user.value.userId !== this.poster.userId) return;

    console.log('delete');
    const { data } = (await $httpClient(
      `v1/${this.endpoint}/${this.id}/comments/${commentId}`,
      {
        method: 'DELETE',
      }
    )) as ResData<CommentInterface>;

    if (data.status != 'ok') return Error(data.message);

    this.comments = this.comments.filter((comment) => comment.id !== commentId);
  }

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
