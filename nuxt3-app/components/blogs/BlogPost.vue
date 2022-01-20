<template>
  <div
    class="blogCard"
    :class="{ noImage: !blog?.photoMetaData }"
    @click="$emit('click')"
  >
    <div class="title">{{ blog?.title }}</div>
    <div class="datePosted">{{ Post.formatDate(blog.publishDate) }}</div>

    <div v-if="blog?.content" class="content" v-html="blog.content"></div>
    <div v-else class="content loadingContent"></div>

    <div
      v-if="blog.photoMetaData"
      class="image"
      :style="{ background: imageUrl }"
    ></div>

    <div class="footer">
      <Avatar
        v-if="blog?.poster.userId"
        :fullName="true"
        :userId="blog.poster.userId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Post } from '@/models/posts/post';
import Avatar from '@/components/Avatar.vue';

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
.blogCard {
  --max-lines: 8;
  --vertical-gap: var(--spacing-500);
  --grid-columns: calc((100% - var(--vertical-gap)) / 2);

  cursor: pointer;
  display: grid;
  gap: var(--spacing-200) 0;
  grid-template-columns: var(--grid-columns) var(--grid-columns);
  grid-template-areas: 'title title' 'datePosted image' 'content image' 'footer footer';

  & .title {
    grid-area: title;
    font-size: var(--subtitle);
    font-weight: var(--thicc);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & .datePosted {
    grid-area: datePosted;
    color: var(--grey-color-500);
  }
  & .content {
    grid-area: content;
    margin-top: var(--spacing-100);
    // Set max amount of rows to var(--max-lines) and add ellipsis to the end
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    min-height: 9rem;
    max-height: 14rem;

    &.loadingContent {
      border-radius: var(--corner-radius);
      background: var(--grey-color-300);
    }
  }
  & .image {
    grid-area: image;
    background-size: cover !important;
    background-position: center !important;
    border-radius: var(--corner-radius);
    min-height: 10rem;
  }
  & .footer {
    margin-top: var(--spacing-400);
    grid-area: footer;
    display: flex;
    align-items: center;
    gap: var(--spacing-200);
    & .category {
      cursor: pointer;
      white-space: nowrap;
    }
    & .avatar {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    &.loadingFooter {
      height: 3rem;
      border-radius: var(--corner-radius);
      background: var(--grey-color-200);
    }
  }
  &.noImage {
    grid-template-areas: 'title title' 'datePosted datePosted' 'content content' 'footer footer';
    & .image {
      display: none;
    }
    & .content {
      min-height: unset;
    }
  }
}
@media screen and (max-width: 40rem) {
  .blogCard {
    --grid-columns: 50%;
    grid-template-areas: 'title title' 'datePosted datePosted' 'image image' 'content content' 'footer footer' !important;
    & .image {
      min-height: 15rem;
    }
    & .content {
      min-height: unset;
    }
  }
}
</style>
<style>
.blogCard .content p {
  margin: 0 !important;
}
</style>
