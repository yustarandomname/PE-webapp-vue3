<template>
  <BlogEditor :blog="blog" />
</template>

<script setup lang="ts">
import { Blog } from './../models/posts/blogs';
import { PostInterface, Poster } from './../models/posts/post';
import BlogEditor from './../components/cards/BlogEditor.vue';

const poster = new Poster(0, 'test123', null, { ORIGINAL: '', MEDIUM: '' });

const post: PostInterface = {
  id: 0,
  title: '',
  poster,
  content: '',
  posterType: 'user',
  comments: [],
  likedBy: [],
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  datePosted: new Date().toDateString(),
  type: 'blog',
};
const blog = new Blog(post);
</script>
