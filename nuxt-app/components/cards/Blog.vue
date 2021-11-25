<template>
  <div
    class="blogCard"
    :class="{ loading: !card, noImage: !card?.photoMetaData?.ORIGINAL }"
    @click="$emit('click')"
  >
    <div class="header">{{ card?.title }}</div>
    <div class="datePosted">{{ datePosted }}</div>
    <div class="content" :class="{ loadingContent: !card?.content }">
      {{ card?.content }}
    </div>

    <div class="image" :style="imageStyles"></div>

    <div class="footer">
      <div class="category" v-for="category in categoryList" :key="category.id">
        {{ category.name }}
      </div>

      <Avatar
        v-if="card?.poster && card.posterType == 'user'"
        :src="card?.poster.photoMetaData?.MEDIUM"
      >
        <NuxtLink :to="'./users?id=' + card?.poster.userId" target="_blank">{{
          card?.poster.fullName
        }}</NuxtLink>
      </Avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Card } from './../../types/card';
import Avatar from '../Avatar.vue';

export default defineComponent({
  name: 'BlogCard',
  components: {
    Avatar,
  },
  props: {
    card: Object as PropType<Card>,
  },
  setup(props) {
    const imageStyles = computed(() => {
      if (!props.card) return { background: 'var(--grey-color-200)' };
      if (!props.card?.photoMetaData?.ORIGINAL) return;

      return { background: `url(${props.card?.photoMetaData?.ORIGINAL})` };
    });

    const categoryList = computed(() => {
      if (!props.card?.category) return;
      return [props.card.category];
    });

    const datePosted = computed(() => {
      if (!props.card?.createdAt) return;
      return new Date(props.card.createdAt).toLocaleDateString();
    });

    return { imageStyles, categoryList, datePosted };
  },
});
</script>

<style scoped lang="scss">
.blogCard {
  --max-lines: 8;
  --vertical-gap: var(--margin-large);
  --grid-columns: calc((100% - var(--vertical-gap)) / 2);
  cursor: pointer;

  display: grid;
  gap: var(--margin-tiny) var(--vertical-gap);
  grid-template-columns: var(--grid-columns) var(--grid-columns);
  grid-template-areas: 'header header' 'datePosted image' 'content image' 'footer footer';

  & .header {
    grid-area: header;
    font-size: var(--header);
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
    margin-top: 0.25rem;

    // Set max amount of rows to var(--max-lines) and add ellipsis to the end
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    min-height: 9rem;

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
    margin-top: var(--margin-tiny);
    grid-area: footer;
    display: flex;
    align-items: center;
    gap: var(--margin-small);

    & .category {
      color: var(--grey-color-600);
      background: var(--grey-color-200);
      padding: var(--padding-tiny) var(--padding-small);
      border-radius: var(--corner-radius);
      font-size: var(--small);
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
    grid-template-areas: 'header header' 'datePosted datePosted' 'content content' 'footer footer';

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
    grid-template-areas: 'header header' 'datePosted datePosted' 'image image' 'content content' 'footer footer' !important;

    & .image {
      min-height: 15rem;
    }

    & .content {
      min-height: unset;
    }
  }
}
</style>
