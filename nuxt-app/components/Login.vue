<template>
  <Modal>
    <template #header>Login</template>
    <form @submit.prevent="login">
      <Input size="large" label="email" v-model="email" />
      <Input size="large" label="password" type="password" v-model="password" />
      <Button size="large" :loading="loading" @click="login">Login</Button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import Input from './inputs/Input.vue';
import Button from './Button.vue';

const { $signIn } = useNuxtApp();

const loading = ref(false);
const email = ref('');
const password = ref('');
const error = ref('');

const login = async (e: Event) => {
  if (!e || e.type != 'submit' || !loading) return;

  loading.value = true;
  const { data } = await $signIn(email.value, password.value);
  error.value = data?.error || '';
  loading.value = false;
};
</script>

<style lang="scss">
.error {
  color: var(--error-color);
  font-size: var(--small);
  margin-top: var(--margin-tiny);
  text-align: right;
}
</style>
