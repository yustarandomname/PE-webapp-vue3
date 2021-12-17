<template>
  <div class="openCardWrapper">
    <BlogOpen @clickBackToNews="goHome" :blog="blog" />
  </div>
</template>

<script setup lang="ts">
import BlogOpen from '@/components/cards/BlogOpen.vue';

import { Blog } from './../../models/posts/blogs';

const nuxtApp = useNuxtApp();

const goHome = () => nuxtApp.$router.push('/');

const blog = ref<Blog>();

onMounted(async () => {
  const id: number | undefined = parseInt(
    nuxtApp.$router.currentRoute.value.query?.id
  );

  if (!id) {
    nuxtApp.$router.push('404');
    return;
  }

  blog.value = await Blog.fetchBlog(nuxtApp, id);
});
</script>

<style lang="scss" scoped></style>
