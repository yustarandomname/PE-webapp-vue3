<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: var(--width, var(--width-large));
  max-width: 90vw;
  background: var(--grey-color-000);
  border-radius: var(--corner-radius);
  margin: var(--margin, 1rem auto);
  padding: var(--padding, var(--padding-small));
}
</style>
