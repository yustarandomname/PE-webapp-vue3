<template>
  <div class="commentWrapper">
    <div class="comment">
      <div class="content">{{ comment.content }}</div>
      <NuxtLink class="postedBy" :to="comment.user.url">{{
        comment.user.fullname
      }}</NuxtLink>
    </div>
    <div class="actions">
      <ion-icon icon="return-down-back-outline" />
      <ion-icon icon="thumbs-up-outline" />
      <ion-icon v-if="true" class="iconClose" icon="trash-outline" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import type { Comment } from "./../types/card";

export default defineComponent({
  name: "Comment",
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.commentWrapper {
  width: 100%;
  margin-bottom: 1rem;
  background: var(--grey-color-200);
  border-radius: var(--corner-radius);
  padding: var(--padding-large);
  color: var(--grey-color-900);
  display: flex;
  align-items: center;

  & .comment {
    width: 100%;
    & .postedBy {
      color: var(--grey-color-700);
      font-size: var(--small);
    }

  }

  & .actions {
    font-size: var(--header);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--grey-color-700);

    & ion-icon:hover {
      color: var(--grey-color-900);
    }

    & .iconClose {
      color: var(--secondary-color-700);

      &:hover {
        color: var(--secondary-color-900);
      }
    }
  }
}
</style>
