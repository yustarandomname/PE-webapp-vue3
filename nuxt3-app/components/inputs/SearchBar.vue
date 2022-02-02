<template>
  <Input
    placeholder="Zoek naam, gewicht, aankoopjaar"
    label="Zoeken"
    v-model="searchQuery"
  />

  <div class="suggestions">
    <div v-for="suggestion in suggestions" class="categories">
      <template v-if="suggestion.entries?.length">
        <div class="title">{{ suggestion.description }}</div>
        <div
          v-for="item in suggestion.entries.slice(0, suggestion.size)"
          class="suggestion"
        >
          <div class="name">{{ item[title] }}</div>
          <div class="description">
            <span v-html="item[suggestion.key]"></span>
            <span v-if="suggestion.append">{{ suggestion.append }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '~~/components/inputs/Input.vue';
import { SearchOrder } from '~~/models/searchOrder';

const props = defineProps<{
  data: object[];
  title: string;
  order?: SearchOrder<any>[];
  maxSuggestions: number;
}>();
const searchQuery = ref<string>('');
const suggestion_i = ref<number>(0);

const suggestions = computed<SearchOrder<any>[]>(() => {
  const val = searchQuery.value;

  // reset entries // todo filter entries not reset
  props.order.map((o) => {
    o.entries = [];
    o.size = 0;
    return o;
  });

  if (val.length == 0 || !props.order?.length) return;

  suggestion_i.value = 0;
  const res = props.order.map((order) => {
    props.data.forEach((item) => {
      const key = (item[order.key] || '').toString();

      if (key.includes(val)) {
        order.entries = [...order.entries, item];
      }
    });
    suggestion_i.value += order.entries.length;
    return order;
  });

  const itemsPerCat = props.maxSuggestions / suggestion_i.value;
  res.forEach((o) => {
    o.size = Math.round(itemsPerCat * o.entries.length);
  });
  res.sort((o1, o2) => o2.entries.length - o1.entries.length);
  console.log(res);
  return res;
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
