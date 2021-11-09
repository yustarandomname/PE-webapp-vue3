<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    icon: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "medium",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classes = computed(() => {
      const classObj: { [key: string]: boolean } = {};
      classObj["disabled"] = !!props.disabled || !!props.loading;
      classObj["size-" + props.size] = !!props.size;
      classObj["state-" + props.state] = !!props.state;
      return classObj;
    });

    return { classes };
  },
});
</script>

<template>
  <button @click="$emit('click')" :class="classes" :disabled="disabled || loading">
    <div v-if="loading">
      <ion-icon name="time-outline" />
      Loading...
    </div>
    <div v-else>
      <ion-icon v-if="icon" :name="icon" />
      <slot />
    </div>
  </button>
</template>

<style scoped lang="scss">
button {
  --color: var(--grey-color-200);
  --bg: var(--grey-color-900);

  all: unset;
  min-width: 20rem;
  max-width: 90vw;
  height: 3em;
  color: var(--color);
  background: var(--bg);
  border-radius: var(--corner-radius);
  cursor: pointer;
  outline-offset: 0px;
  transition: outline-offset 0.2s;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--margin-small);
  }

  // STATES
  &.state-primary {
    --bg: var(--primary-color);
  }
  &.state-success {
    --bg: var(--secondary-color);
    --color: var(--grey-color-900);
  }

  &.state-destructive {
    --bg: var(--destructive-color);
  }

  /* SIZE */
  &.size-small {
    height: 2em;
    min-width: 10rem;
    font-size: 0.8rem;
  }
  &.size-large {
    height: 3rem;
    width: 100%;
    min-width: unset;
  }
}

/* STATE */
button.state-disabled,
button.disabled {
  --bg: var(--grey-color-200);
  --color: var(--grey-color-500);
  cursor: not-allowed !important;
}

/* HOVER */
button:hover:not(.state-disabled, .disabled),
.state-hover {
  outline: 1px solid var(--color);
  outline-offset: -5px;
}
</style>
