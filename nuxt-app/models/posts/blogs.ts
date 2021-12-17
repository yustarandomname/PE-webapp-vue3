import type { NuxtApp } from '#app'; //todo remove this
import { Post, Posts, PostInterface } from './post';

interface NewBlog {
  categoryId: number;
  title: string;
  content: string;
  posterType: 'user' | 'group';
  posterId: number;
  photoId?: number;
  photoHash?: number;
}

export class Blog extends Post {
  constructor(post: PostInterface) {
    super(post);
    this.type = 'blog';
  }

  static async fetchBlog(id: number) {
    const { $httpClient } = useNuxtApp();
    const { data } = await $httpClient(`v1/news/items/${id}`);

    if (data?.status != 'ok') throw Error('not a valid id');

    return new Blog(data.data);
  }

  async save(image?: File, method = 'POST') {
    const { $httpClient } = useNuxtApp();

    const newBlog: NewBlog = {
      categoryId: 1,
      title: this.title,
      content: this.content,
      posterType: this.poster.firstName ? 'user' : 'group',
      posterId: this.poster.userId,
    };

    if (image) {
      const { id, hash } = await this.uploadImage(image);
      console.log(image, id, hash);
      if (id && hash) {
        newBlog.photoId = id;
        newBlog.photoHash = hash;
      }
    }

    const endpoint =
      method == 'PUT' ? `v1/news/items/${this.id}` : `v1/news/items`;

    const { data } = await $httpClient(endpoint, {
      method,
      data: newBlog,
    });

    return data;
  }

  async delete() {
    const { $httpClient } = useNuxtApp();
    await $httpClient(`v1/news/items/${this.id}`, {
      method: 'DELETE',
    });
  }

  getRawData(): string {
    return `<h1>${this.title}</h1>${this.content}`;
  }
}

export class Blogs extends Posts {
  constructor(posts: Post[]) {
    super(posts);
  }

  static async fetchBlogs(
    amount: number = 10,
    offset: number = 0
  ): Promise<Blogs> {
    const { $httpClient } = useNuxtApp();
    const { data } = await $httpClient('v1/news/items');

    // if status is not 200
    if (data?.status != 'ok') return new Blogs([]);

    // data: {status: 'ok', data: Post[]}
    const blogs = data.data.map((post: Post) => new Blog(post));
    return new Blogs(blogs);
  }
}
