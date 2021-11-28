<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: var(--width, --width-large);
  max-width: 90vw;
  background: var(--color-white);
  border-radius: var(--border-radius);
}
</style>
