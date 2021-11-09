<template>
  <div class="avatar" :class="classes">
    <slot />
    <img @click="$emit('click')" :src="src" :alt="alt" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

type AvatarSize = "small" | "medium" | "large";
type AvatarAlign = "left" | "right" | "top" | "bottom";
const defaultSrc = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

export default defineComponent({
  props: {
    src: {
      type: String,
      default: defaultSrc,
    },
    alt: {
      type: String,
      default: "avatar",
    },
    size: {
      type: String,
      default: "medium",
    },
    align: {
      type: String,
      default: "left",
    },
  },
  setup(props) {
    const classes = computed(() => {
      const classObject: { [key: string]: boolean } = {};
      classObject["size-" + props.size] = !!props.size;
      classObject["align-" + props.align] = !!props.align;
      return classObject;
    });

    return { classes };
  },
});
</script>

<style scoped>
.avatar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0 0.25rem;
  width: var(--width, fit-content);
  margin: var(--margin, 0);
}
.avatar img {
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid var(--grey-color-200);
}

/* Size */
.avatar.size-large > img {
  height: 4rem;
  width: 4rem;
}
.avatar.size-small > img {
  height: 2rem;
  width: 2rem;
}
.avatar.size-small {
  font-size: 0.8rem;
}

/* Align */
.avatar.align-right {
  flex-direction: row-reverse;
}
.avatar.align-top {
  flex-direction: column;
}
.avatar.align-bottom {
  flex-direction: column-reverse;
}
</style>
