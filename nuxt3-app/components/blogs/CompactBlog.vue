<template>
  <div class="compactBlog" @click="$emit('click')">
    <div class="info">
      <div class="title">{{ blog?.title }}</div>
      <div class="date">{{ Post.formatDate(blog.publishDate) }}</div>
    </div>
    <div
      v-if="blog.photoMetaData"
      class="image"
      :style="{ background: imageUrl }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { Post } from '@/models/posts/post';
import { PropType } from 'vue';

const props = defineProps({
  blog: {
    type: Object as PropType<Post>,
    required: false,
  },
});
defineEmits(['click']);

const imageUrl = ref('none');

onMounted(async () => {
  const bannerUrl = await props.blog.getPhotoUrl();

  if (!bannerUrl) return;
  imageUrl.value = `url(${bannerUrl})`;
});
</script>

<style scoped lang="scss">
.compactBlog {
  width: 100%;
  background: var(--grey-color-200);
  border-radius: var(--corner-radius);
  display: flex;
  cursor: pointer;
  margin: var(--spacing-200) 0;

  .info {
    width: 100%;
    padding: var(--spacing-200);

    .title {
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--spacing-200);
    }

    .date {
      font-size: var(--small);
      color: var(--grey-color-500);
    }
  }

  .image {
    width: 9rem;
    background-size: cover !important;
    border-radius: var(--corner-radius);
    border: 2px solid var(--grey-color-200);
  }
}
</style>
