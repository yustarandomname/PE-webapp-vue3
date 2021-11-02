<template>
  <div>
    <h1>Welcome to Nuxt.js!!!</h1>
    <Avatar>test</Avatar>
    <Button icon="heart">test</Button>
    <ion-icon name="heart"></ion-icon>

    <InfiniteList @fetch="$fetch">
      <h1>item1</h1>
      <div>item1</div>
      <div>item1</div>
      <div>item1</div>
    </InfiniteList>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
import InfiniteList from "@/components/InfiniteList.vue";

export default {
  components: { Avatar, Button, InfiniteList },
  data: () => ({
    posts: [],
  }),
  async fetch(list, amount) {
    const cards = new Array(amount).fill("Loaded").map(() => {
      return {
        id: Math.floor(Math.random() * 10000),
        title: "Card",
      };
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    list.value = [...list.value, ...cards];
  },
};
</script>

<style lang="scss">
h1 {
  color: blue;

  &:hover {
    color: #0f0;
  }
}
</style>
