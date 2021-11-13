<template>
  <div class="dropdown" :class="classes">
    <div class="label">{{ label }}</div>
    <select :disabled="disabled" v-model="input">
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Dropdown",
  props: {
    label: {
      type: String as PropType<string>,
      default: "",
    },
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    size: {
      type: String as PropType<"small" | "medium" | "large">,
      default: "medium",
    },
  },
  setup(props, { emit }) {
    const classes = computed(() => {
      const classes: { [key: string]: boolean } = {};
      classes["size-" + props.size] = !!props.size;
      classes["disabled"] = props.disabled;
      return classes;
    });

    const input = computed({
      get() {
        return props.modelValue as string;
      },
      set(value: string) {
        emit("update:modelValue", value);
      },
    });

    return {
      classes,
      input,
    };
  },
});
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;

  & .label {
    font-size: var(--small);
  }

  & select {
    width: 20rem;
    height: 2.2rem;
    max-width: 90vw;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    outline: none;
    border: none;
    background: var(--grey-color-200);
    color: var(--grey-color-900);
  }

  &.disabled {
    & .label {
      color: var(--grey-color-500);
    }
  }
}

.size-large select {
  width: 100%;
}

.size-small select {
  width: 10rem;
}
</style>
