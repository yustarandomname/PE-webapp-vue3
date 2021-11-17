<template>
  <div>
    <InfiniteList @fetch="fetchItems" :autoLoad="true">
      <template #default="card">
        <Blog v-bind="card.item" @click="openCard(card.item)" />
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
import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
import InfiniteList from "@/components/InfiniteList.vue";
import Blog from "@/components/cards/Blog.vue";
import BlogOpen from "@/components/cards/BlogOpen.vue";

import type { Card as CardType } from "../types/card";

import { Ref, defineComponent, onMounted, onBeforeUnmount } from "vue";
import { getRandomCards, loadingCard } from "./../util/getRandomParagraph";

export default defineComponent({
  components: { Avatar, Button, InfiniteList, Blog, BlogOpen },

  setup() {
    const nuxtApp = useNuxtApp();
    const openedCard: Ref<CardType | null> = ref(null);

    const fetchItems = async (list: Ref<CardType[]>, amount: number) => {
      const cards = getRandomCards(amount);

      await new Promise((resolve) => setTimeout(resolve, 500));
      list.value = [...list.value, ...cards];
    };

    // HANDLE OPEN / CLOSE BLOG POST
    const openCard = (card: CardType) => {
      openedCard.value = card;

      const nextURL = `?id=${card.id}`;
      nuxtApp.$router.push(nextURL);
    };

    const backToNewsfeed = () => {
      openedCard.value = null;
      nuxtApp.$router.push("/");
    };

    onMounted(() => {
      const cardId = nuxtApp.$router.currentRoute.value.query?.id;
      if (cardId) {
        nuxtApp.$router.push("/");
        nuxtApp.$router.push(`/cards?id=${cardId}`);
      }

      window.addEventListener("popstate", (e: PopStateEvent) => {
        if (e.state.current == "/") {
          openedCard.value = null;
        }
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("popstate", () => {});
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
