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

import { Ref, defineComponent } from "vue";
import { getRandomParagraph } from "./../util/getRandomParagraph";

export default defineComponent({
  components: { Avatar, Button, InfiniteList, Blog, BlogOpen },
  setup() {
    const openedCard: Ref<CardType | null> = ref(null);

    const openCard = (card: CardType) => {
      openedCard.value = card;

      const nextURL = `/cards?id=${card.id}`;
      const nextState = { additionalInformation: "Updated the URL with JS" };
      window.history.pushState(nextState, "card", nextURL);
    };

    const backToNewsfeed = () => (openedCard.value = null);

    const fetchItems = async (list: Ref<CardType[]>, amount: number) => {
      const cards = new Array(amount).fill("Loaded").map(() => {
        const id = Math.floor(Math.random() * 10000).toString();
        const content = getRandomParagraph(id);
        const user = {
          fullname: "Webcie",
          avatar: "https://proteus-eretes.nl/fotodir/0/0_tumb.jpg",
          url: "https://proteus-eretes.nl",
        };

        return {
          id,
          header: "Card",
          datePosted: "Vandaag",
          content,
          image: "https://proteus-eretes.nl/fotodir/0/0_l.jpg",
          postedBy: user,
          comments: [
            {
              id: 1,
              user,
              likes: 1,
              content: "Hallo ik vind dit een leuke post",
            },
            {
              id: 3,
              user,
              likes: 1,
              content: "Hallo ik vind dit ook een leuke post",
            },
          ],
          likes: 1,
          categories: ["Hallo"],
        };
      });

      if (list.value.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        list.value = [...list.value, ...cards];
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
        list.value = cards;
      }
    };

    const loadingCard: CardType = {
      id: "loading",
      header: "Loading",
      datePosted: "",
      content: "",
      image: "loading",
      postedBy: {
        fullname: "",
        avatar: "",
        url: "",
      },
      likes: 0,
      comments: [],
      categories: [],
    };

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
