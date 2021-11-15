<template>
  <div>
    <h1 ref="headline">Headline</h1>

    <Login />

    <Texteditor v-model="input2" />

    <div class="container">
      <Input
        placeholder="hello"
        v-model="input1"
        icon="trash-outline"
        @iconClick="input1 = ''"
      />

      <p>input1: {{ input1 }}</p>
      <p>input2: {{ input2 }}</p>
    </div>
  </div>
</template>

<script>
import Input from "../components/inputs/Input.vue";
import Texteditor from "../components/texteditor/Texteditor.vue";

export default {
  components: {
    Input,
    Texteditor,
  },

  data() {
    return {
      editor: null,
      input1: "",
      input2: "",
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
