<template>
  <div>
    <ActionButtons>
      <Button>Terug naar nieuwsfeed</Button>
      <Button class="alignLeft">Boten</Button>
      <Button>Beschikbaar voor | mij</Button>
    </ActionButtons>

    <Container>
      <div class="dateTime">
        <Input type="date" label="Datum" v-model="fromDateString" />
        <Input type="time" label="Vanaf" v-model="fromTimeString" />
        <Input type="time" label="Tot" v-model="toTimeString" />
        <Button class="daylight" size="small" icon="light_mode"></Button>
      </div>
      <SearchBar
        :data="afschrijfItems"
        title="item_name"
        :order="searchOrder"
        :maxSuggestions="10"
      ></SearchBar>
    </Container>
  </div>
</template>

<script setup lang="ts">
import ActionButtons from '~~/components/buttons/ActionButtons.vue';
import Button from '~~/components/buttons/Button.vue';
import Input from '~~/components/inputs/Input.vue';
import SearchBar from '~~/components/inputs/SearchBar.vue';
import { ComputedDateTime } from '~~/models/dateTime';
import { SearchOrder } from '~~/models/searchOrder';
import { afschrijfItems, AfschrijfItem } from '~~/data/afschrijfboek_items';

const searchOrder: SearchOrder<AfschrijfItem>[] = [
  { key: 'item_name', type: 'string', description: 'Naam' },
  { key: 'weight', type: 'string', description: 'Gewicht', append: 'kg' },
  { key: 'class_id', type: 'number', description: 'Type' },
  { key: 'subcategory_id', type: 'number', description: 'Sub type' },
  { key: 'year', type: 'number', description: 'Bouwjaar' },
];

const fromDate = new ComputedDateTime();
const toDate = new ComputedDateTime();
toDate.setTime(fromDate.date.value.getHours() + 1);

const setDayLight = async () => {
  const [lat, lng] = [51.9925692, 4.3688648];
  const date = fromDate.getDateString(['year', 'month', 'day']);
  const data = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`
  );
  const { results } = await data.json();
  const { sunrise, sunset } = results;
  fromDate.date.value = new Date(sunrise);
  toDate.date.value = new Date(sunset);
};

const fromDateString = computed<string>({
  get() {
    return fromDate.getDateString(['year', 'month', 'day']);
  },
  set(value: string) {
    fromDate.setDateString(value);
    toDate.setDateString(value);
  },
});

const fromTimeString = computed<string>({
  get() {
    return fromDate.getTimeString(['hour', 'minute']);
  },
  set(value: string) {
    fromDate.setTimeString(value);
  },
});

const toTimeString = computed<string>({
  get() {
    return toDate.getTimeString(['hour', 'minute']);
  },
  set(value: string) {
    toDate.setTimeString(value);
  },
});

onMounted(() => {
  setDayLight();
});
</script>

<style scoped lang="scss">
.alignLeft {
  margin-left: auto;
}

.dateTime {
  display: flex;
  gap: var(--spacing-300);
  align-items: center;

  .daylight {
    height: 3rem;
  }
}
</style>
