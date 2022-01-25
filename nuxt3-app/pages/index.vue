<template>
  <div class="container">
    <ActionButtons rightAlign>
      <Button state="primary" icon="add" @click="$router.push('/mijnposts')">
        Mijn berichten
      </Button>
    </ActionButtons>

    <InfiniteList :key="$router.currentRoute.value.fullPath">
      <template #default="post">
        <!-- <BlogPost :blog="new Post(post)" @click="openPost(post)" /> -->
      </template>

      <template #loading> loading </template>
    </InfiniteList>
  </div>
</template>

<script setup lang="ts">
import ActionButtons from '@/components/buttons/ActionButtons.vue';
import Button from '@/components/buttons/Button.vue';

import { PostInterface } from '@/models/posts/post';

const router = useRouter();
const fromDate = computed(() => {
  const query = router.currentRoute.value?.query;

  if (!query?.from) return new Date();
  return new Date(query.from as string);
});

// HANDLE OPEN BLOG POST
const openPost = async (postInterface: PostInterface) => {
  router.push(`/blogs/?id=${postInterface.id}`);
};
</script>

<style lang="scss" scoped>
.container {
  margin: var(--spacing-600) auto;
}
</style>
