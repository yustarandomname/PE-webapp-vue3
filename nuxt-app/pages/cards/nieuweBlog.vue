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
  title: '',
  poster,
  content: '<p></p>',
  posterType: 'user',
  comments: [],
  likedBy: [],
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  datePosted: new Date().toDateString(),
  type: 'blog',
};
const blog = new Blog(post);

const publishBlog = async (title: string, content: string, image?: File) => {
  blog.title = title;
  blog.content = content;

  const { data } = await blog.save(image, 'POST');
  if (data) nuxtApp.$router.push('/');
};
</script>
