<template>
  <div class="openCardWrapper">
    <BlogOpen @clickBackToNews="goHome" :blog="blog" />
  </div>
</template>

<script lang="ts">
import BlogOpen from './../../components/cards/BlogOpen.vue';

import { defineComponent } from 'vue';
import { Blog } from './../../models/posts/blogs';

export default defineComponent({
  name: 'cards',
  components: {
    BlogOpen,
  },
  setup() {
    const nuxtApp = useNuxtApp();

    const goHome = () => nuxtApp.$router.push('/');

    const blog = ref<Blog>();

    onMounted(async () => {
      const id: number | undefined = parseInt(
        nuxtApp.$router.currentRoute.value.query?.id
      );

      if (!id) {
        nuxtApp.$router.push('404');
        return;
      }

      blog.value = await Blog.fetchBlog(nuxtApp, id);
    });

    return {
      blog,
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
