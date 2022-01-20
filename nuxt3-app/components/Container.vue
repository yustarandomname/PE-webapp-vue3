<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  --container-width: var(--width-large);
  --container-background: var(--grey-color-000);

  width: var(--container-width);
  max-width: 90vw;
  background: var(--container-background);
  border-radius: var(--corner-radius);
  padding: var(--spacing-200);
  margin: var(--spacing-400) auto;
}
</style>
