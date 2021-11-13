<template>
  <div class="input" :class="classes">
    <label :for="id">
      <div v-if="inputTitle" class="label">{{ inputTitle }}</div>
      <input
        v-model="input"
        :type="type"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :id="id"
        :placeholder="placeholder"
        :required="required"
        @focus="focus = true"
        @blur="focus = false"
      />
      <div v-if="icon" class="icon" @click.stop="emitIconClick">
        <ion-icon :icon="icon" />
      </div>
    </label>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

type InputTypes =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "month"
  | "week"
  | "color"
  | "file"
  | "range"
  | "checkbox"
  | "radio"
  | "hidden";

type InputSize = "small" | "medium" | "large";

export default defineComponent({
  name: "Input",
  props: {
    type: {
      type: String as PropType<InputTypes>,
      default: "text",
    },
    modelValue: String as PropType<string>,
    placeholder: String as PropType<string>,
    label: String as PropType<string>,
    icon: String as PropType<string>,
    error: String as PropType<string>,
    autocomplete: {
      type: String as PropType<InputTypes>,
      default: "off",
    },
    size: String as PropType<InputSize>,
    disabled: Boolean as PropType<boolean>,
    required: Boolean as PropType<boolean>,
  },
  setup(props, { emit }) {
    // random string
    const id = `input-${Math.random().toString(36).substr(2, 9)}`;

    const focus = ref(false);

    const focusIn = computed(() => {
      if (focus.value || !!props.modelValue) return true;
      if (props.type == "date" || props.type == "time" || props.type == "color")
        return true;

      return false;
    });

    const inputTitle = computed(() => {
      let title = props.label || props.placeholder || props.type;
      if (props.required) title += "*";

      return title;
    });

    // Handle V-modal
    const input = computed({
      get() {
        return props.modelValue as string;
      },
      set(value: string) {
        emit("update:modelValue", value);
      },
    });

    // Handle Classes
    const classes = computed(() => {
      const classes: { [key: string]: boolean } = {};
      classes.focusIn = focusIn.value;
      classes.focus = focus.value;
      classes["size-" + props.size] = !!props.size;
      classes.disabled = !!props.disabled;
      return classes;
    });

    // Emit icon click
    const emitIconClick = () => {
      if (props.disabled) return;
      emit("iconClick");
    };

    return {
      id,
      focus,
      focusIn,
      inputTitle,
      classes,
      emitIconClick,
      input,
    };
  },
});
</script>

<style scoped lang="scss">
::placeholder {
  color: transparent;
}
.input {
  margin-top: var(--margin-small);
  width: 20rem;
  max-width: var(--max-width);
  & label {
    position: relative;
    background: var(--grey-color-200);
    border-radius: var(--inner-corner-radius);
    display: flex;
    align-items: center;
    padding: 0 var(--padding-small);
    & .label {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      transition: 0.2s;
      color: var(--grey-color-700);
      font-size: var(--small);
    }
    & input {
      width: var(--width-full);
      padding: var(--padding-input);
      outline: none !important;
      border: none;
      background: var(--transparent-color);
    }
    & .icon {
      cursor: pointer;
      --color: var(--grey-color-800);
    }
  }
  &.focus {
    & label {
      outline: 1px solid var(--primary-color, #0058a9);
    }
    & ::placeholder {
      color: var(--grey-color-500);
    }
  }
  &.focusIn {
    & .label {
      left: 0rem;
      top: -1.1rem;
      transform: translateY(0);
    }
  }
  &.disabled {
    & input {
      color: var(--grey-color-500);
    }
    & .icon {
      --color: var(--grey-color-500);
    }
  }
  & .error {
    color: var(--error-color, #ff0000);
    font-size: var(--small);
    display: flex;
    justify-content: flex-end;
  }
}
</style>
