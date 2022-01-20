<template>
  <button
    @click.self="$emit('click')"
    :class="classes"
    :disabled="disabled || loading"
    :data-tooltip="tooltip"
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

type ButtonState = 'default' | 'primary' | 'disabled' | 'destructive';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  state: {
    type: String as PropType<ButtonState>,
    default: 'default',
  },
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
  tooltip: String as PropType<string>,
});

const classes = computed(() => {
  const classObj: { [key: string]: boolean } = {};
  classObj['button'] = true;
  classObj['disabled'] = !!props.disabled || !!props.loading;
  classObj['size-' + props.size] = !!props.size;
  classObj['state-' + props.state] = !!props.state;
  classObj['hasTooltip'] = !!props.tooltip;
  return classObj;
});
</script>

<style scoped lang="scss">
.button {
  --color: var(--grey-color-100);
  --background-color: var(--grey-color-900);
  --button-radius: var(--corner-radius);

  position: relative !important;
  all: unset;
  min-width: max-content;
  max-width: var(--max-width);
  color: var(--color);
  background: var(--background-color);
  border-radius: var(--button-radius);
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-200);
    padding: var(--spacing-300) var(--spacing-400);
    font-family: sans-serif;
  }

  // STATES
  &.state-default:not(.loading):not(.disabled):hover {
    --background-color: var(--primary-color-900);
    --color: var(--primary-color-100);
  }

  &.state-primary {
    --background-color: var(--primary-color-900);
    &:hover {
      background-color: var(--primary-color-800);
      transition: 0.1s ease-in;
    }
  }

  &.state-destructive {
    --background-color: var(--destructive-color-200) !important;
    --color: var(--destructive-color-900) !important;
    opacity: 0.6;
  }

  /* DISABLED */
  &.state-disabled,
  &.disabled {
    --background-color: var(--grey-color-200);
    --color: var(--grey-color-500);
    cursor: not-allowed !important;
  }

  // TOOLTIPS
  &.hasTooltip {
    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -1rem;
      background: var(--grey-color-300);
      border-radius: var(--corner-radius-small);
      color: var(--grey-color-900);
      font-size: var(--tiny);
      width: max-content;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      padding: var(--spacing-100);
    }

    &:not(.disabled):hover::after {
      opacity: 1;
    }
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

  &.size-large {
    min-width: var(--width-small);
    width: 100%;
  }
}
</style>
