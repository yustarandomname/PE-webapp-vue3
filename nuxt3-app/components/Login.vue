<template>
  <Modal>
    <template #header>Welkom bij de Proteus-Eretes app</template>
    <!-- TODO: Add text for users who have not logged in before -->
    <form @submit.prevent="login">
      <Input
        autocomplete="username"
        size="medium"
        label="Email"
        v-model="email"
      />
      <Input
        type="password"
        autocomplete="current-password"
        size="medium"
        label="Wachtwoord"
        v-model="password"
      />

      <Button state="primary" :loading="loading" @click.self="login">
        Inloggen
      </Button>

      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import Button from './buttons/Button.vue';
import Input from './inputs/Input.vue';
import Modal from './Modal.vue';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const login = async (e: Event) => {
  if (!e || e.type != 'submit' || !loading) return;
  loading.value = true;

  const { $signIn } = useNuxtApp();

  const userOrError = await $signIn(email.value, password.value);

  error.value = '';
  loading.value = false;
};
</script>
