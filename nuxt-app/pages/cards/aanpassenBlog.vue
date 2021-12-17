<template>
  <div v-if="openedPost">
    <BlogEditor edit :blog="openedPost" />
  </div>
</template>

<script setup lang="ts">
import BlogEditor from '@/components/cards/BlogEditor.vue';
import { Blog } from './../../models/posts/blogs';

const nuxtApp = useNuxtApp();
const openedPost = ref<Blog>();

onMounted(async () => {
  const cardId = nuxtApp.$router.currentRoute.value.query?.id;

  // Set card to open if url has an Id of a blog post
  openedPost.value = cardId ? await Blog.fetchBlog(nuxtApp, cardId) : undefined;
});
</script>
