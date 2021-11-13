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
      <Dropdown v-model="input3" :options="['one', 'two', 'three']" />
      <p>input1: {{ input1 }}</p>
      <p>input2: {{ input2 }}</p>
    </div>
  </div>
</template>

<script>
import Input from "../components/inputs/Input.vue";
import Checkbox from "../components/inputs/Checkbox.vue";
import Dropdown from "../components/inputs/Dropdown.vue";

export default {
  components: {
    Input,
    Checkbox,
    Dropdown,
  },
  data() {
    return {
      input1: "123",
      input2: false,
      input3: "",
    };
  },
};
</script>

<style scoped>
.container {
  width: 40rem;
  margin: var(--margin-small) auto;
  padding: var(--padding-small);
  border-radius: var(--corner-radius);
  background: var(--grey-color-000);
}
</style>
