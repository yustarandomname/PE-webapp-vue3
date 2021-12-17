<template>
  <BlogEditor :blog="blog" @publish="publishBlog" @delete="$router.push('/')" />
</template>

<script setup lang="ts">
import { Blog } from './../../models/posts/blogs';
import { User } from './../../models/user';
import { PostInterface, Poster } from './../../models/posts/post';
import BlogEditor from '@/components/cards/BlogEditor.vue';

interface NewBlog {
  categoryId: number;
  title: string;
  content: string;
  posterType: 'user' | 'group';
  posterId: number;
  photoId?: number;
  photoHash?: number;
}

const nuxtApp = useNuxtApp();
const currentUser = nuxtApp.$user.value as User;

const poster = new Poster(
  currentUser.userId,
  currentUser.fullName,
  null,
  currentUser.photoMetaData
);

const post: PostInterface = {
  title: 'Titel',
  poster,
  content: '<p>content</p>',
  posterType: 'user',
  comments: [],
  likedBy: [],
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  datePosted: new Date().toDateString(),
  type: 'blog',
};
const blog = new Blog(post);

const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('photo', image);

  const { data } = await nuxtApp.$httpClient('v1/upload-photo', {
    method: 'POST',
    headers: { 'content-type': 'multipart/form-data' },
    data: formData,
  });

  if (data.status == 'ok') return { id: data.data.id, hash: data.data.hash };
  return { id: null, hash: null };
};

const extractContent = (
  content: string
): { title?: string; content?: string } => {
  const dom = new DOMParser().parseFromString(content, 'text/html');
  const domTitle = dom.body.firstChild as HTMLHeadingElement;
  const domContentBody = dom.body;
  domContentBody.firstElementChild.remove();

  if (domTitle?.tagName != 'H1') return; // todo show error
  if (domTitle.textContent.length > 140) return; // todo show error

  return { title: domTitle.textContent, content: domContentBody.innerHTML };
};

const publishBlog = async (content: string, image: File) => {
  const newBlog: NewBlog = {
    categoryId: 1,
    title: '',
    content: '',
    posterType: poster.fullName ? 'user' : 'group',
    posterId: poster.userId,
  };

  const extractedContent = extractContent(content);
  if (!extractedContent.title) return;
  newBlog.title = extractedContent.title;
  newBlog.content = extractedContent.content;

  // if image is changed, upload it
  if (image.name) {
    const { id, hash } = await uploadImage(image);
    if (id && hash) {
      newBlog.photoId = id;
      newBlog.photoHash = hash;
    }
  }

  console.log(newBlog);

  const { data } = await nuxtApp.$httpClient('v1/news/items', {
    method: 'POST',
    data: newBlog,
  });

  if (data.status == 'ok') {
    nuxtApp.$router.push('/');
  }
};
</script>
