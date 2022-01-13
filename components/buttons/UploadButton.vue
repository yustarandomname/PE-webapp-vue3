<template>
  <label :class="classes" :disabled="disabled || loading" :for="id">
    <div v-if="loading">
      <i class="material-icons">hourglass_empty</i>
      Loading...
    </div>
    <div v-else>
      <i class="material-icons-outlined">cloud_upload</i>
      <slot></slot>
      <input :id="id" type="file" @change="emitChange" />
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

const emit = defineEmits<{
  (e: 'change', file: File): void;
}>();

const props = defineProps({
  size: {
    type: String as PropType<'tiny' | 'small' | 'medium' | 'large'>,
    default: 'medium',
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

const id = 'upload-' + Math.random().toString(36).substring(2, 9);

const classes = computed(() => {
  const classObj: { [key: string]: boolean } = {};
  classObj['button'] = true;
  classObj['disabled'] = !!props.disabled || !!props.loading;
  classObj['size-' + props.size] = !!props.size;
  return classObj;
});

const emitChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files[0];
  if (!file) return;
  emit('change', file);
};
</script>

<style scoped lang="scss">
label {
  --color: var(--white-color);
  --background-color: var(--grey-color-900);
  --button-radius: 2rem;

  display: block !important;
  margin: 0 auto !important;
  position: relative !important;
  all: unset;
  min-width: max-content;
  max-width: var(--max-width);
  color: var(--color);
  background: var(--grey-color-900);
  border-radius: var(--button-radius);
  cursor: pointer;
  transition: 0.1s ease-in;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-200);
    padding: var(--spacing-300) var(--spacing-400);
    font-family: sans-serif;
  }

  &:hover {
    background-color: var(--primary-color-900);
  }

  /* DISABLED */
  &.state-disabled,
  &.disabled {
    --background-color: var(--grey-color-200);
    --color: var(--grey-color-500);
    cursor: not-allowed !important;
  }

  /* SIZE */
  &.size-tiny {
    --button-radius: 0.75rem;
    font-size: var(--normal);

    & > div {
      padding: var(--spacing-100) var(--spacing-200);
    }
  }

  &.size-small {
    font-size: var(--normal);
    & > div {
      padding: var(--spacing-200) var(--spacing-300);
    }
  }

  .size-large {
    min-width: var(--width-small);
  }
}

input[type='file'] {
  cursor: pointer;
  width: 100%;
  position: absolute;
  opacity: 0;
}
</style>
