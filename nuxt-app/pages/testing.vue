<template>
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [StarterKit],
});
</script>

<style scoped>
.size-large {
  width: 100%;
  --width: 100%;
}

.size-small {
  width: 20rem;
}

.container {
  width: 40rem;
  margin: var(--margin-small) auto;
  padding: var(--padding-small);
  border-radius: var(--corner-radius);
  background: var(--grey-color-000);
}
</style>
