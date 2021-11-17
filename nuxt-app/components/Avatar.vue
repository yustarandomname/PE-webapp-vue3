<template>
  <div class="avatar" :class="classes" @click="emitClick">
    <slot>{{ name }}</slot>
    <img :src="src" :alt="alt" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

type AvatarSize = "small" | "medium" | "large";
type AvatarAlign = "left" | "right" | "top" | "bottom";
const defaultSrc =
  "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

export default defineComponent({
  props: {
    src: {
      type: String as PropType<string>,
      default: defaultSrc,
    },
    alt: {
      type: String as PropType<string>,
      default: "avatar",
    },
    size: {
      type: String as PropType<AvatarSize>,
      default: "medium",
    },
    align: {
      type: String as PropType<AvatarAlign>,
      default: "left",
    },
    name: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props, { emit }) {
    const classes = computed(() => {
      const classObject: { [key: string]: boolean } = {};
      classObject["size-" + props.size] = !!props.size;
      classObject["align-" + props.align] = !!props.align;
      return classObject;
    });

    const emitClick = () => {
      console.log("click");
      emit("click");
    };

    return { classes, emitClick };
  },
});
</script>

<style scoped lang="scss">
.avatar {
  --size: 3rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0 0.25rem;
  width: var(--width, fit-content);
  margin: var(--margin, 0);

  & img {
    height: var(--size);
    width: var(--size);
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid var(--grey-color-200);
  }

  // IMAGE SIZE
  &.size- {
    &large > img {
      --size: 4rem;
    }

    &small {
      font-size: 0.8rem;
      --size: 2rem;
    }
  }

  // IMAGE ALIGN
  &.align- {
    &-right {
      flex-direction: row-reverse;
    }

    &-top {
      flex-direction: column;
    }

    &-bottom {
      flex-direction: column-reverse;
    }
  }
}
</style>
