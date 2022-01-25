<template>
  <div class="background" @click.self="$emit('close')">
    <div class="modal" @click.stop>
      <div class="header">
        <slot name="header">{{ title }}</slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>();
defineEmits(['close']);
</script>

<style scoped lang="scss">
.background {
  --modal-width: var(--width-medium);
  --modal-background: white;
  --modal-backdrop: hsl(207deg 30% 93% / 90%);
  --modal-max-height: calc(100vh - 6rem);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal-backdrop);
  z-index: 100;
  backdrop-filter: blur(3px);
  cursor: pointer;

  & .modal {
    position: absolute;
    top: calc(50% + 2.5rem);
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--modal-width);
    max-width: 90vw;
    max-height: var(--modal-max-height);
    background-color: var(--modal-background);
    border-radius: var(--corner-radius-large);
    cursor: default;
    padding: var(--spacing-600) var(--spacing-700);
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-400) 0;

    display: flex;
    flex-direction: column;
    gap: var(--spacing-400) 0;

    & .header {
      display: flex;
      align-items: center;
      width: 100%;
      color: var(--primary-color-900);
      font-size: var(--subtitle);
      gap: 0.75rem;
      height: 2rem;
    }

    & .header:empty {
      display: none;
    }
  }
}
</style>
