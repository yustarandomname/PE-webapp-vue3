<template>
  <div>
    <InfiniteList @fetch="fetchItems" :autoLoad="true">
      <template #default="card">
        <Blog :card="card.item" @click="openCard(card.item)" />
      </template>

      <template #loading>
        <Blog v-bind="loadingCard" />
      </template>
    </InfiniteList>

    <div v-if="openedCard" class="openCardWrapper">
      <BlogOpen :card="openedCard" @clickBackToNews="backToNewsfeed" />
    </div>
  </div>
</template>

<script lang="ts">
import Avatar from '@/components/Avatar.vue';
import Button from '@/components/Button.vue';
import InfiniteList from '@/components/InfiniteList.vue';
import Blog from '@/components/cards/Blog.vue';
import BlogOpen from '@/components/cards/BlogOpen.vue';

import type { Card } from '../types/card';

import { Ref, defineComponent, onMounted, onBeforeUnmount } from 'vue';
import { loadBlogs } from './../util/blogs';
import { loadingCard } from './../util/getRandomParagraph';

export default defineComponent({
  components: { Avatar, Button, InfiniteList, Blog, BlogOpen },

  setup() {
    const nuxtApp = useNuxtApp();
    const openedCard: Ref<Card | null> = ref(null);

    const fetchItems = async (list: Ref<Card[]>, amount: number) => {
      const newCards = await loadBlogs(nuxtApp);

      list.value = [...list.value, ...newCards];
    };

    // HANDLE OPEN / CLOSE BLOG POST
    const openCard = (card: Card) => {
      openedCard.value = card;

      const nextURL = `?id=${card.id}`;
      nuxtApp.$router.push(nextURL);
    };

    const backToNewsfeed = () => {
      openedCard.value = null;
      nuxtApp.$router.push('/');
    };

    onMounted(async () => {
      const cardId = nuxtApp.$router.currentRoute.value.query?.id;
      if (cardId) {
        nuxtApp.$router.push('/');
        nuxtApp.$router.push(`/cards?id=${cardId}`);
      }

      window.addEventListener('popstate', (e: PopStateEvent) => {
        if (e.state.current == '/') {
          openedCard.value = null;
        }
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('popstate', () => {});
    });

    return { fetchItems, openedCard, openCard, backToNewsfeed, loadingCard };
  },
});
</script>

<style lang="scss" scoped>
.openCardWrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  padding-top: 4rem;
  top: 0;
  left: 0;
  background: var(--grey-color-200);
}
</style>
