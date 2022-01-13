<template>
  <button
    @click.self="$emit('click')"
    :class="classes"
    :disabled="disabled || loading"
  >
    <div v-if="loading">
      <i v-if="icon" class="material-icons">hourglass_empty</i>
      Loading...
    </div>
    <div v-else>
      <i v-if="icon" class="material-icons-outlined">{{ icon }}</i>
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const classes = computed(() => {
  const classObj: { [key: string]: boolean } = {};
  classObj['disabled'] = !!props.disabled || !!props.loading;
  return classObj;
});
</script>

<style scoped lang="scss">
button {
  font-size: var(--small);
  position: relative;
  all: unset;
  padding: var(--spacing-100) var(--spacing-200);
  color: var(--grey-color-800);
  background: white;
  border-radius: var(--corner-radius);
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-100);
    font-family: sans-serif;
  }

  &:hover {
    transition: 0.1s ease-in;
    background-color: var(--grey-color-200);
  }
}

/* DISABLED */
button.state-disabled,
button.disabled {
  background: var(--grey-color-200);
  color: var(--grey-color-500);
  cursor: not-allowed !important;
}
</style>
