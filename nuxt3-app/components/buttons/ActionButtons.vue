<template>
  <section
    class="actionButtons"
    :class="{ alignActionsRight: rightAlign, placementBottem: bottom }"
  >
    <slot></slot>
  </section>
</template>

<script lang="ts" setup>
defineProps({
  rightAlign: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.actionButtons {
  width: min(var(--width-large), 100%);
  margin: var(--spacing-400) auto;
  max-width: var(--max-width);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-200);

  &.alignActionsRight {
    justify-content: end;
  }

  &.placementBottem {
    margin-bottom: 5rem;
  }
}
</style>

<style>
.actionButtons .leftAlign {
  margin-right: auto;
}
</style>
