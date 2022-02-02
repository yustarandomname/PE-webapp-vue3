<template>
  <Input
    placeholder="Zoek naam, gewicht, aankoopjaar"
    label="Zoeken"
    v-model="searchQuery"
  />

  <div class="suggestions">
    <div v-for="[key, value] in Object.entries(suggestions)" class="categories">
      <template v-if="value.distinctEntySize">
        <div class="title">{{ key }}</div>
        <div class="suggestions">
          <div
            v-for="entry in Object.entries(value.distictEntries)"
            class="suggestion"
          >
            <div class="name">{{ getDescription(entry[0], value.keys) }}</div>
            <div class="description">({{ entry[1] }})</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '~~/components/inputs/Input.vue';
import { SearchItem } from '~~/models/searchOrder';

const props = defineProps<{
  data: object[];
  title: string;
  searchItems?: SearchItem<any>;
  maxSuggestions: number;
}>();
const searchQuery = ref<string>('');

const getDescription = (
  description: object | string | number,
  keys: string[]
) => {
  if (typeof description === 'string') {
    return description;
  }
  const result = keys.reduce((acc, key) => {
    if (description[key]) {
      return `${acc} ${description[key]}`;
    }
    return acc;
  }, '');
  return result;
};

const suggestions = computed<SearchItem<any>>(() => {
  const val = searchQuery.value;

  if (!val) return props.searchItems;
  const searchItems = { ...props.searchItems };

  for (const [key, value] of Object.entries(searchItems)) {
    value.distictEntries = {};

    value.entries = props.data.filter((item) => {
      if (value.type == 'object') {
        const filteredKeys = value.keys.filter((k) => {
          const x = (item[key][k] || '').toString().toLowerCase();
          return x.includes(val.toLowerCase());
        });

        return filteredKeys.length > 0;
      }

      const x = (item[key] || '').toString().toLowerCase();
      return x.includes(val.toLowerCase());
    });

    value.entries.forEach((entry) => {
      let k = entry[key];
      if (value.type == 'object') {
        const valuePrimaryKey = value.keys[0];
        k = entry[key][valuePrimaryKey];
      }
      if (value.distictEntries[k]) value.distictEntries[k]++;
      else value.distictEntries[k] = 1;
    });

    value.distinctEntySize = Object.keys(value.distictEntries).length;
  }

  return props.searchItems;
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
