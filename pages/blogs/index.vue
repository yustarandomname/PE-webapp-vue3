<template>
  <div>
    <BlogOpen v-if="openedBlog" :blog="openedBlog" />
    <div v-else>Geen blog gevonden</div>
  </div>
</template>

<script setup lang="ts">
import BlogOpen from '@/components/blogs/BlogOpen.vue';
import { Post } from '@/models/Post';

const openedBlog = ref<Post>();

onBeforeMount(async () => {
  const router = useRouter();
  const cardId = parseInt(router.currentRoute.value.query?.id as string);
  if (!cardId) return;

  const post = await Post.fetch(cardId);
  if (post) openedBlog.value = post;
});
</script>

<style scoped lang="scss"></style>
