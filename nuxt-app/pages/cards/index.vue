<template>
  <div class="openCardWrapper">
    <BlogOpen @clickBackToNews="goHome" :card="card" />
  </div>
</template>

<script lang="ts">
import BlogOpen from './../../components/cards/BlogOpen.vue';

import { defineComponent } from 'vue';
import { loadBlog } from './../../util/blogs';
import type { Card } from './../../types/card';

export default defineComponent({
  name: 'cards',
  components: {
    BlogOpen,
  },
  setup() {
    const nuxtApp = useNuxtApp();

    const goHome = () => nuxtApp.$router.push('/');

    const card = ref<Card>();

    onMounted(async () => {
      const id: number | undefined = parseInt(
        nuxtApp.$router.currentRoute.value.query?.id
      );

      if (!id) {
        nuxtApp.$router.push('404');
        return;
      }

      card.value = await loadBlog(nuxtApp, id);
    });

    return {
      card,
      goHome,
    };
  },
  // data() {
  //   return {
  //     cardId: this.$route.query.id,
  //     card: this.getCard(this.$route.query.id),
  //   };
  // },
  // methods: {
  //   goHome() {
  //     this.$router.push("/");
  //   },
  //   getCard(id: string): Card {
  //     const card =
  //   }
  // },
});
</script>

<style lang="scss" scoped></style>
