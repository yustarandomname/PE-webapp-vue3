<template>
  <Container>
    <div class="editorButtons">
      <div class="action" v-for="button in editorButtons">
        <div v-if="button.id == 'divider'" class="divider" />
        <Button
          v-else
          size="tiny"
          :icon="button.icon"
          :disabled="button?.isDisabled && button.isDisabled()"
          :class="{
            active: button?.isActive && button?.isActive(),
          }"
          @click="button.action()"
        />
      </div>

      <Button class="insertButton" size="small">Invoegen</Button>
    </div>
    <editor-content :editor="editor" />
  </Container>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

const editor = useEditor({
  content: '<p>I’m running Tiptap <b>with</b> Vue.js. 🎉</p>',
  extensions: [StarterKit, Underline],
});

const chainedCmd = computed(() => editor.value.chain().focus());

const textSize = computed(() => {
  if (editor.value?.isActive('heading', { level: 1 })) return 'h1';
  if (editor.value?.isActive('heading', { level: 2 })) return 'h2';
  if (editor.value?.isActive('blockquote')) return 'blockquote';
  if (
    editor.value?.isActive('orderedList') ||
    editor.value?.isActive('bulletList')
  )
    return 'list';
  else return 'p';
});

const decreaseSize = () => {
  if (textSize.value == 'h2' || textSize.value == 'blockquote')
    editor.value.commands.setParagraph();
  else if (textSize.value == 'h1')
    editor.value.commands.setHeading({ level: 2 });
  else return;

  editor.value.commands.focus();
};

const increaseSize = () => {
  if (textSize.value == 'p') editor.value.commands.setHeading({ level: 2 });
  else if (textSize.value == 'h2')
    editor.value.commands.setHeading({ level: 1 });
  else return;

  editor.value.commands.focus();
};

const editorButtons = [
  {
    id: 'tekst kleiner',
    icon: 'text_decrease',
    action: decreaseSize,
    isDisabled: () => !(textSize.value == 'h1' || textSize.value === 'h2'),
  },
  {
    id: 'tekst groter',
    icon: 'text_increase',
    action: () => increaseSize(),
    isDisabled: () => !(textSize.value === 'p' || textSize.value === 'h2'),
  },
  {
    id: 'divider',
  },
  {
    id: 'lijst',
    icon: 'format_list_bulleted',
    isActive: () =>
      editor.value?.isActive('bulletList') ||
      editor.value?.isActive('orderedList'),
    action: () => chainedCmd.value.toggleBulletList().run(),
  },
  {
    id: 'citaat',
    icon: 'format_quote',
    isActive: () => editor.value?.isActive('blockquote'),
    action: () => chainedCmd.value.toggleBlockquote().run(),
  },
  {
    id: 'divider',
  },
  {
    id: 'bold',
    icon: 'format_bold',
    isActive: () => editor?.value?.isActive('bold'),
    action: () => chainedCmd.value.toggleBold().run(),
  },
  {
    id: 'italic',
    icon: 'format_italic',
    isActive: () => editor?.value?.isActive('italic'),
    action: () => chainedCmd.value.toggleItalic().run(),
  },
  {
    id: 'underline',
    icon: 'format_underlined',
    isActive: () => editor?.value?.isActive('underline'),
    action: () => chainedCmd.value.toggleUnderline().run(),
  },
  {
    id: 'divider',
  },
  {
    id: 'ongedaan maken',
    icon: 'undo',
    action: () => chainedCmd.value.undo().run(),
    isDisabled: () => !editor.value?.can()?.undo(),
  },
  {
    id: 'opnieuw doen',
    icon: 'redo',
    action: () => chainedCmd.value.redo().run(),
    isDisabled: () => !editor.value?.can()?.redo(),
  },
];
</script>

<style scoped lang="scss">
.editorButtons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: sticky;
  top: 4.5rem;
  background: #ffffffab;
  backdrop-filter: blur(7px) saturate(2);
  padding: 1rem 0.5rem 0.5rem;
  z-index: 1;

  & .divider {
    width: 1px;
    height: 2rem;
    background-color: var(--grey-color-700);
  }

  & .action button {
    --bg: transparent;
    --color: var(--grey-color-800);

    &.active {
      --bg: var(--primary-color-300);
      --color: var(--primary-color-900);
    }

    &.disabled {
      // TODO: make inactive buttons inactive
      --color: var(--grey-color-200);
      --bg: transparent;
    }
  }

  & .insertButton {
    margin-left: auto;
  }
}
</style>

<style lang="scss">
.ProseMirror {
  padding: var(--padding-small);
  outline: none;

  & blockquote {
    margin: 0;
    border-left: 2px solid var(--grey-color-900);
    padding: var(--padding-small);

    & p {
      margin: 0;
      font-size: var(--subheader);
      font-style: italic;
    }
  }
}
</style>
