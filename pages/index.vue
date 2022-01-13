<template>
  <div class="container">
    <!-- Removed because no mobile support -->
    <MenuButtons v-if="false"></MenuButtons>

    <ActionButtons rightAlign>
      <FilterButtons v-if="false" class="leftAlign"></FilterButtons>

      <Button state="primary" icon="add" @click="$router.push('/mijnposts')">
        Mijn berichten
      </Button>
    </ActionButtons>

    <InfiniteList
      :fromDate="fromDate"
      :where="postsAfterFromDate"
      :key="$router.currentRoute.value.fullPath"
    >
      <template #default="post">
        <BlogPost :blog="new Post(post)" @click="openPost(post)" />
      </template>

      <template #loading> loading </template>
    </InfiniteList>
  </div>
</template>

<script setup lang="ts">
import BlogPost from '@/components/blogs/BlogPost.vue';

import FilterButtons from '@/components/buttons/FilterButtons.vue';
import ActionButtons from '@/components/buttons/ActionButtons.vue';
import MenuButtons from '@/components/buttons/MenuButtons.vue';
import Button from '@/components/buttons/Button.vue';

import { Post, PostInterface, Query } from '../models/post';

const router = useRouter();
const fromDate = computed(() => {
  const query = router.currentRoute.value?.query;

  if (!query?.from) return new Date();
  return new Date(query.from as string);
});
const postsAfterFromDate = computed(() => {
  const dateFrom = fromDate.value;
  dateFrom.setHours(dateFrom.getHours() + 1, dateFrom.getMinutes() + 1);

  const query: Query = (q) => q.lt('publish_date', dateFrom.toISOString());
  return query;
});

// HANDLE OPEN / CLOSE BLOG POST
const openPost = async (postInterface: PostInterface) => {
  router.push(`/blogs/?id=${postInterface.id}`);
};
</script>

<style lang="scss" scoped>
.container {
  margin: var(--spacing-600) auto;
}
</style>
