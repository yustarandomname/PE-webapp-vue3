<template>
  <div class="list">
    <div v-if="title" class="title">{{ title }}</div>

    <div class="loadMore" v-if="!hideNoNewItems && itemsBefore != 0">
      <Button
        :loading="itemsToLoad > 0"
        @click="$router.push('/')"
        size="small"
      >
        <span v-if="itemsBefore == 1">
          Er is nog 1 nieuwe bericht om te laden
        </span>
        <span v-else>
          Er zijn nog {{ itemsBefore }} nieuwe bericht om te laden
        </span>
      </Button>
    </div>

    <!-- Loaded items in list -->
    <section v-for="post in list" class="card">
      <slot v-bind="post"> {{ post }}</slot>
    </section>

    <section v-for="item in new Array(itemsToLoad)" :key="item" class="card">
      <slot name="loading"></slot>
    </section>

    <div class="loadMore">
      <Button v-if="!reachedBottom" @click="loadMore" size="small">
        Meer laden
      </Button>

      <Button v-else-if="!hideNoNewItems" size="small" :disabled="true">
        Er zijn geen nieuwe nieuws items meer
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Blog, Blogs } from '@/models/posts/blogs';
import Button from '@/components/buttons/Button.vue';

const props = defineProps({
  title: {
    type: String as PropType<string>,
    required: false,
  },
  fromDate: {
    type: Object as PropType<Date>,
  },
  hideNoNewItems: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  bottomOffset: {
    type: Number,
    default: 400,
  },
});

const fetchAmount = 10; // TODO: for production, go back to 10
const list = ref<Blog[]>([]);
const itemsToLoad = ref(fetchAmount);
const reachedBottom = ref(false);
const lastDate = ref(props.fromDate || new Date()); // last date
const itemsBefore = ref(0);
</script>

<style scoped lang="scss">
.list {
  --list-width: var(--width-large);

  width: var(--list-width);
  max-width: var(--max-width);
  margin: var(--spacing-200) auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-500);

  .title {
    font-size: var(--header);
  }

  .card {
    padding: var(--spacing-500) var(--spacing-600);
    background: var(--white-color);
    border-radius: var(--corner-radius);
    box-shadow: 0 0 0 1px rgba(9, 9, 9, 0.1);
  }
}

.loadMore {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-500);
}

@media screen and (max-width: 40rem) {
  .list {
    --list-width: var(--width-full);
    gap: 0;

    & .card {
      padding: var(--spacing-400);
      border-radius: 0;
    }

    & .card:first-of-type {
      border-radius: var(--corner-radius-large) var(--corner-radius-large) 0 0;
    }

    &.card:last-of-type {
      border-radius: 0 0 var(--corner-radius-large) var(--corner-radius-large);
    }

    & .card:not(:last-child) {
      border-bottom: 2px solid var(--grey-color-200);
    }
  }
}
</style>
