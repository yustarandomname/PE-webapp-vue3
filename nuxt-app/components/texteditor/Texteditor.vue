<template>
  <div class="editorWrapper">
    <div class="actions">
      <div
        class="actionFolder"
        v-for="(actionFolder, index) in actionFolders"
        :class="{ open: openIndex == index }"
      >
        <div
          class="button folder"
          :data-tooltip="actionFolder.title"
          @click="toggleOpenFolder(index)"
        >
          <i class="material-icons">{{ actionFolder.icon }}</i>
        </div>
        <div
          class="button"
          :class="[action.class]"
          :data-tooltip="action.title"
          v-for="action in actionFolder.actions"
          @click="executeAction(action, content)"
        >
          <i class="material-icons">{{ action.icon }}</i>
        </div>
      </div>

      <div
        class="button"
        :data-tooltip="action.title"
        v-for="action in specialActions"
        @click="executeAction(action, content)"
      >
        <i class="material-icons">{{ action.icon }}</i>
      </div>
    </div>
    <div class="content" contenteditable ref="content" @keyup="handleInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { actionFolders, specialActions } from "./actionFolders";
import { executeAction } from "./executeAction";

export default defineComponent({
  name: "textEditor",
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props, { emit }) {
    const content = ref<HTMLElement | null>(null);
    const openIndex = ref<number>(0);

    const toggleOpenFolder = (index: number) => {
      openIndex.value = index;
    };

    // Handle V-modal
    const handleInput = (e: KeyboardEvent) => {
      const val = (e.target as HTMLInputElement).innerHTML;
      emit("update:modelValue", val);
    };

    onMounted(() => {
      if (content.value) {
        const copyTextarea = content.value;
        copyTextarea.innerHTML = props.modelValue;

        content.value = copyTextarea;
      }
    });

    return {
      content,
      openIndex,
      toggleOpenFolder,
      actionFolders,
      specialActions,
      executeAction,
      handleInput,
    };
  },
});
</script>

<style lang="scss">
.editorWrapper {
  margin: 1rem auto;
  width: var(--width-large);
  max-width: 90vw;
  max-height: 90vh;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--margin-small);
  margin-bottom: var(--margin-small);

  & .actionFolder {
    display: flex;
    gap: var(--margin-small);

    &:not(.open) > .button:not(.folder) {
      display: none;
    }
  }
}

.content {
  width: 100%;
  min-height: 15rem;
  background: white;
  padding: var(--padding-medium);
  border-radius: var(--corner-radius);

  &:focus {
    outline: var(--primary-color-700) 1px solid;
  }
}

.button {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--corner-radius);
  background: var(--primary-color-200);
  cursor: pointer;
  user-select: none;

  & > i {
    font-size: var(--header);
  }

  &:before {
    content: attr(data-tooltip);
    position: absolute;
    opacity: 0;
    bottom: -1.5rem;
    left: 50%;
    font-size: var(--tiny);
    background: var(--grey-color-800);
    color: white;
    padding: var(--padding-tiny);
    border-radius: var(--inner-corner-radius);
    transform: translateX(-50%) scale(0.5);
    transition: 0.3s;
    width: max-content;
    z-index: 100;
  }

  &:hover:before {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }

  &.folder {
    background: var(--primary-color-800);
    color: white;
  }

  &.h2 > i {
    font-size: calc(var(--header) - 0.2rem);
  }

  &.h3 > i {
    font-size: calc(var(--header) - 0.4rem);
  }
}

.open .folder {
  background: var(--primary-color-500);
}
</style>
