<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import Avatar from "../Avatar.vue";

interface User {
  name: string;
  avatar: string;
  url: string;
}

export default defineComponent({
  name: "BlogCard",
  components: {
    Avatar,
  },
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
    header: {
      type: String as PropType<string>,
      required: true,
    },
    datePosted: {
      type: String as PropType<string>,
      default: new Date().toLocaleDateString(),
    },
    content: String as PropType<string>,
    image: {
      type: String as PropType<string>,
      default: "loading",
    },
    postedBy: Object as PropType<User>,
    categories: Array as PropType<string[]>,
  },
  setup(props) {
    const MAX_CATEGORIES_LENGTH = 1;

    const imageStyles = computed(() => {
      if (!props.image) return;
      if (props.image == "loading")
        return { background: "var(--grey-color-200)" };
      return { background: `url(${props.image})` };
    });

    const loadingFooter = computed(() => {
      return { loadingFooter: props.image == "loading" };
    });

    const categoryList = computed(() => {
      if (!props.categories) return;
      if (props.categories.length < MAX_CATEGORIES_LENGTH)
        return props.categories;
      return props.categories.slice(0, MAX_CATEGORIES_LENGTH);
    });

    const moreCategories = computed(() => {
      if (!props.categories) return 0;
      return props.categories.length - MAX_CATEGORIES_LENGTH;
    });

    return { imageStyles, loadingFooter, categoryList, moreCategories };
  },
});
</script>

<template>
  <div class="blogCard" :class="{ noImage: !image }" @click="$emit('click')">
    <div class="header">{{ header }}</div>
    <div class="datePosted">{{ datePosted }}</div>
    <div class="content" :class="{ loadingContent: !content }">
      {{ content }}
    </div>

    <div class="image" :style="imageStyles"></div>

    <div class="footer" :class="loadingFooter">
      <div class="category" v-for="category in categoryList" :key="category">
        {{ category }}
      </div>
      <div v-if="moreCategories > 0" class="category">
        + {{ moreCategories }}
      </div>

      <Avatar v-if="postedBy" :src="postedBy.avatar">
        <a :href="postedBy.url" target="_blank">{{ postedBy.fullname }}</a>
      </Avatar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blogCard {
  --max-lines: 8;
  --vertical-gap: var(--margin-large);
  --grid-columns: calc((100% - var(--vertical-gap)) / 2);
  cursor: pointer;

  display: grid;
  gap: var(--margin-tiny) var(--vertical-gap);
  grid-template-columns: var(--grid-columns) var(--grid-columns);
  grid-template-areas: "header header" "datePosted image" "content image" "footer footer";

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
    grid-template-areas: "header header" "datePosted datePosted" "content content" "footer footer";

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
    grid-template-areas: "header header" "datePosted datePosted" "image image" "content content" "footer footer" !important;

    & .image {
      min-height: 15rem;
    }

    & .content {
      min-height: unset;
    }
  }
}
</style>
