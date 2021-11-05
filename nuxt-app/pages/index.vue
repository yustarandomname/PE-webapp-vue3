<template>
  <div>
    <h1>Welcome to Nuxt.js!!!</h1>
    <ion-icon name="heart"></ion-icon>

    <InfiniteList @fetch="fetchItems" :autoLoad="false">
      <template #default="card">
        <div class="card">
          <h1>ID: {{ card.item.id}}</h1>
          <p>Title: {{card.item.id}}</p>
        </div>
      </template>

      <template #loading>
        <h1>Loading</h1>
        <div>Loading...</div>
      </template>
    </InfiniteList>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
import InfiniteList from "@/components/InfiniteList.vue";

export default {
  components: { Avatar, Button, InfiniteList },
  setup() {
    const fetchItems = async (list, amount) => {
      const cards = new Array(amount).fill("Loaded").map(() => {
        return {
          id: Math.floor(Math.random() * 10000),
          title: "Card",
        }
      })
      await new Promise((resolve) => setTimeout(resolve, 2000));
      list.value = [...list.value, ...cards];
    }

    return { fetchItems };
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
