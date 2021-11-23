<template>
  <Modal v-if="!authenticated">
    <template #header>Login</template>
    <form @submit.prevent="login">
      <Input size="large" label="email" v-model="email" />
      <Input size="large" label="password" type="password" v-model="password" />
      <Button size="large" :loading="loading" @click="login">Login</Button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
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
  props: {
    error: String,
  },
  setup() {
    const nuxtApp = useNuxtApp();

    const loading = ref(false);
    const email = ref("");
    const password = ref("");

    const login = async (e: Event) => {
      if (!e && !loading) return;

      loading.value = true;
      await nuxtApp.$signIn(email.value, password.value);
      loading.value = false;
    };

    return {
      email,
      password,
      login,
      loading,
      authenticated: nuxtApp.$authenticated,
    };
  },
});
</script>

<style lang="scss">
.error {
  color: var(--error-color);
}
</style>
