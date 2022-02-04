<template>
  <Input
    placeholder="Zoek naam, gewicht, aankoopjaar"
    label="Zoeken"
    v-model="searchQuery"
  />

  <div class="suggestions" v-if="searchQuery">
    <div v-for="value in suggestions" class="categories">
      <template v-if="value.sortedDistintEntries?.length">
        <div class="title">{{ value.name }}</div>
        <div class="suggestions">
          <div v-for="entry in value.sortedDistintEntries" class="suggestion">
            <div class="name">{{ entry.key }}</div>
            <div class="description">({{ entry.count }})</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '~~/components/inputs/Input.vue';
import {
  SearchItem,
  Item,
  findEntries,
  findDistinctValues,
  setKeyAsValue,
  sortedSuggestions,
} from '~~/models/search';

const props = defineProps<{
  data: object[];
  title: string;
  searchItems?: SearchItem<any>;
  maxSuggestions: number;
}>();
const searchQuery = ref<string>('');

const suggestions = computed<Item<any>[]>(() => {
  if (!searchQuery.value) return Object.values(props.searchItems);
  const searchItems = { ...props.searchItems };

  for (const [key, value] of Object.entries(searchItems)) {
    setKeyAsValue(key, value);
    findEntries(key, value, props.data, searchQuery.value);
    findDistinctValues(key, value);
  }

  return sortedSuggestions(searchItems, props.maxSuggestions);
});
</script>

<style scoped lang="scss">
.title {
  font-weight: bold;
  font-size: 1.2em;
}

.suggestion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  cursor: pointer;

  .description {
    color: var(--grey-color-700);
  }
}
</style>
