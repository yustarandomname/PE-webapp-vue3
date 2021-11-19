<template>
  <div class="openCardWrapper">
    <BlogOpen @clickBackToNews="goHome" :card="card" />
  </div>
</template>

<script lang="ts">
import BlogOpen from "./../../components/cards/BlogOpen.vue";

import { getRandomParagraph } from "./../../util/getRandomParagraph";
import { defineComponent } from "vue";
import type { Card } from "./../../types/card";

export default defineComponent({
  name: "cards",
  components: {
    BlogOpen,
  },
  data() {
    return {
      cardId: this.$route.query.id,
      card: this.getCard(this.$route.query.id),
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    getCard(id: string) {
      const res: Card = {
        id,
        header: "Card Title",
        content: getRandomParagraph(id),
        datePosted: "14 November 2021",
        image:
          "https://proteus-eretes.nl/fotodir/9/4302046373479632498357880629432153520189105555869407221139449194_l.jpg",
        postedBy: {
          id: "1",
          fullname: "bob de bouwer",
          avatar:
            "https://proteus-eretes.nl/fotodir/12/7619863282148583613195970945632825098817142836418924819294100046_tumb.jpg",
          url: "/users?id=1",
        },
        likes: 3,
        comments: [
          {
            id: 1,
            content: "Ik vind helemaal mooi",
            user: {
              id: "1",
              fullname: "bob de bouwer",
              avatar:
                "https://proteus-eretes.nl/fotodir/12/7619863282148583613195970945632825098817142836418924819294100046_tumb.jpg",
              url: "/users?id=1",
            },
            likes: 5,
          },
        ],
        categories: [],
      };

      return res;
    },
  },
});
</script>

<style lang="scss" scoped></style>
