<template>
  <Modal style="--width: 40rem" v-if="card" @close="closeCard">
    <template #header>
      <div class="title">{{ card.header }}</div>
      <ion-icon v-if="`current-user=card.user`" icon="pencil" />
      <NuxtLink :to="'cards?id=' + card.id">
        <ion-icon icon="expand-outline" />
      </NuxtLink>

      <ion-icon class="largeIcon" icon="close" @click="closeCard" />
    </template>

    <div
      v-if="card.image"
      class="image"
      :style="'background:url(' + card.image + ')'"
    />

    <div class="meta" v-if="card.postedBy">
      <Avatar :src="card.postedBy.avatar">
        <a :href="card.postedBy.url" target="_blank">{{
          card.postedBy.name
        }}</a>
      </Avatar>
    </div>

    <p>{{ card.content }}</p>
    
    

  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Modal from "./../Modal.vue";
import type { Card as CardType } from "./../../types/card";

export default defineComponent({
  name: "BlogOpen",
  components: {
    Modal,
  },
  props: {
    card: {
      type: Object as PropType<CardType | null>,
    },
  },
  setup(_, { emit }) {
    const closeCard = () => emit("closeCard");

    return { closeCard };
  },
});
</script>

<style lang="scss">
.title {
  width: 100%;
}

ion-icon {
  cursor: pointer;

  &.largeIcon {
    font-size: 1.5em;
  }
}

.image {
  min-height: 15rem;
  margin: var(--margin-small) 0;
  background-position: center center !important;
  background-size: cover !important;
  border-radius: var(--corner-radius);
}

.meta {
  display: flex;
  justify-content: flex-end;
  --width: fit-content;
}
</style>
