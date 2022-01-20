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

    <InfiniteList :key="$router.currentRoute.value.fullPath">
      <template #default="post">
        {{ post }}
        <!-- <BlogPost :blog="new Post(post)" @click="openPost(post)" /> -->
      </template>

      <template #loading> loading </template>
    </InfiniteList>
  </div>
</template>

<script setup lang="ts">
import FilterButtons from '@/components/buttons/FilterButtons.vue';
import ActionButtons from '@/components/buttons/ActionButtons.vue';
import MenuButtons from '@/components/buttons/MenuButtons.vue';
import Button from '@/components/buttons/Button.vue';

import { PostInterface } from '../models/posts/post';

// HANDLE OPEN / CLOSE BLOG POST
const openPost = async (postInterface: PostInterface) => {
  const { $router } = useNuxtApp();
  $router.push(`/blogs/?id=${postInterface.id}`);
};
</script>

<style lang="scss" scoped>
.container {
  margin: var(--spacing-600) auto;
}
</style>
