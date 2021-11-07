<template>
  <div>
    <NavigationBar userName="Webcie" userAvatar="https://proteus-eretes.nl/fotodir/0/0_tumb.jpg"/>

    <InfiniteList @fetch="fetchItems" :autoLoad="true">
      <template #default="card">
        <Blog v-bind="card.item" @click="openCard(card.item)" />
      </template>
    </InfiniteList>

    <BlogOpen :card="openedCard" />
  </div>
</template>

<script lang="ts">
import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
import InfiniteList from "@/components/InfiniteList.vue";
import Blog from "@/components/cards/Blog.vue"
import BlogOpen from "@/components/cards/BlogOpen.vue"

import type {Card as CardType} from "../types/card"

import {Ref, defineComponent} from "vue";

export default defineComponent({
  components: { Avatar, Button, InfiniteList, Blog, BlogOpen },
  setup() {

    const openedCard: Ref<CardType | null> = ref(null);

    const openCard = (card: CardType) => {
      openedCard.value = card;
    }

    const closeCard = () => openedCard.value = null;

    const fetchItems = async (list: Ref<CardType[]>, amount: number) => {
      const cards = new Array(amount).fill("Loaded").map(() => {
        return {
          id: Math.floor(Math.random() * 10000).toString(),
          header: "Card",
          datePosted: "Vandaag",
          content: "A very long text",
          image: "https://proteus-eretes.nl/fotodir/0/0_l.jpg",
          postedBy: {
            name: "Webcie",
            avatar: "https://proteus-eretes.nl/fotodir/0/0_tumb.jpg",
            url: "https://proteus-eretes.nl"
          },
          categories: ["Hallo"]
        }
      })
      await new Promise((resolve) => setTimeout(resolve, 2000));
      list.value = [...list.value, ...cards];
    }

    return {fetchItems, openedCard, openCard, closeCard}
  }
});
</script>

<style lang="scss">
h1 {
  color: blue;

  &:hover {
    color: #0f0;
  }
}
</style>
