<template>
  <div class="filterButtons">
    <Filter icon="article">Blogs</Filter>
    <Filter icon="event">Eetlijsten</Filter>
    <Filter icon="poll">Polls</Filter>
    <Filter icon="perm_media">Media</Filter>
  </div>
</template>

<script setup lang="ts">
import Filter from '@/components/inputs/Filter.vue';
</script>

<style scoped lang="scss">
.filterButtons {
  box-shadow: 0 0 0 1px rgba(9, 9, 9, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-200);
  padding: var(--spacing-200) var(--spacing-300);
  background-color: white;
  border-radius: var(--corner-radius);
}
</style>
