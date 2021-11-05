<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
    },
  },
});
</script>

<template>
  <div class="background" @click="$emit('close')">
    <div class="modal" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 100;
  backdrop-filter: blur(3px);
  cursor: pointer;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--width-medium);
  min-height: 20rem;
  max-width: 90vw;
  background-color: var(--white-color);
  border-radius: var(--corner-radius-large);
  box-shadow: 0 0 3rem 0 var(--grey-color-400);
  cursor: default;
  padding: var(--padding-large);
}
</style>
