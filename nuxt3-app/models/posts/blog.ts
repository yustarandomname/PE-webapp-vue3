import { useNuxtApp } from '#app';
import { Method } from 'axios';
import { Post, PostInterface } from './post';

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

  async save(image?: File, method: Method = 'POST') {
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
