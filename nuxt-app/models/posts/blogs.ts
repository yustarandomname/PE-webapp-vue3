import type { NuxtApp } from '#app';
import { Post, Posts, PostInterface } from './post';

export class Blog extends Post {
  constructor(post: PostInterface) {
    super(post);
    this.type = 'blog';
  }

  static async fetchBlog(nuxtApp: NuxtApp, id: number) {
    const { data } = await nuxtApp.$httpClient(`v1/news/items/${id}`);

    if (data?.status != 'ok') throw Error('not a valid id');

    return new Blog(data.data);
  }
}

export class Blogs extends Posts {
  constructor(posts: Post[]) {
    super(posts);
  }

  static async fetchBlogs(
    nuxtApp: NuxtApp,
    amount: number = 10,
    offset: number = 0
  ): Promise<Blogs> {
    const { data } = await nuxtApp.$httpClient('v1/news/items');

    // if status is not 200
    if (data?.status != 'ok') return new Blogs([]);

    // data: {status: 'ok', data: Post[]}
    const blogs = data.data.map((post: Post) => new Blog(post));
    return new Blogs(blogs);
  }
}
