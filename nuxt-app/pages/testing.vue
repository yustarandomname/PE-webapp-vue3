<template>
  <div>
    <div class="container">
      <Input placeholder="hello" v-model="input1" icon="trash-outline" />
      <p>input1: {{ input1 }}</p>
    </div>
  </div>
</template>

<script>
import Input from "./../components/inputs/input.vue";

export default {
  components: {
    Input,
  },
  data() {
    return {
      input1: "123",
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
