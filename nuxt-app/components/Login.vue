<template>
  <Modal v-if="!authenticated">
    <template #header>Login</template>
    <Input size="large" label="email" v-model="email" />
    <Input size="large" label="password" type="password" v-model="password" />
    <Button size="large" @click="login">Login</Button>
  </Modal>
</template>

<script lang="ts">
import Modal from "./Modal.vue";
import Input from "./inputs/Input.vue";
import Button from "./Button.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "login",
  components: {
    Modal,
    Input,
    Button,
  },
  setup() {
    const nuxtApp = useNuxtApp();

    const email = ref("");
    const password = ref("");

    const login = (e: Event) => {
      if (!e) return;

      nuxtApp.$signIn(email.value, password.value);
    };

    return {
      email,
      password,
      login,
      authenticated: nuxtApp.$authenticated,
    };
  },
});
</script>
