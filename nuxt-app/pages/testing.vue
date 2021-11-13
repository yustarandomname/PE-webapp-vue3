<template>
  <div>
    <div class="container">
      <Input
        placeholder="hello"
        v-model="input1"
        icon="trash-outline"
        @iconClick="input1 = ''"
      />
      <Checkbox v-model="input2" label="click me" />
      <Dropdown
        label="dropdown"
        v-model="input3"
        :options="['one', 'two', 'three']"
      />
      <Radio
        label="radio"
        v-model="input4"
        :options="['one', 'two', 'three']"
        orientation="vertical"
      />
      <p>input1: {{ input1 }}</p>
      <p>input2: {{ input2 }}</p>
      <p>input3: {{ input3 }}</p>
      <p>input4: {{ input4 }}</p>
    </div>
  </div>
</template>

<script>
import Input from "../components/inputs/Input.vue";
import Checkbox from "../components/inputs/Checkbox.vue";
import Dropdown from "../components/inputs/Dropdown.vue";
import Radio from "../components/inputs/Radio.vue";

export default {
  components: {
    Input,
    Checkbox,
    Dropdown,
    Radio,
  },
  data() {
    return {
      input1: "123",
      input2: false,
      input3: "one",
      input4: "one",
    };
  },
};
</script>

<style scoped>
.size-large {
  width: 100%;
  --width: 100%;
}

.size-small {
  width: 20rem;
}

.container {
  width: 40rem;
  margin: var(--margin-small) auto;
  padding: var(--padding-small);
  border-radius: var(--corner-radius);
  background: var(--grey-color-000);
}
</style>
