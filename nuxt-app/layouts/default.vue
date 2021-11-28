<template>
  <NavigationBar :user="user">
    <template #menu> </template>
  </NavigationBar>

  <Login v-if="!authenticated" :error="loginError" />
  <slot v-else />
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { setupAuth, refreshUser } from './../util/authentication';
import { User, UserInterface } from './../models/user';
const nuxtApp = useNuxtApp();
const loginError = ref<string>();

const user = computed(() => {
  const user = nuxtApp.$user.value as UserInterface;
  if (!user) return;

  return new User(user);
});
const authenticated = computed(() => nuxtApp.$user.value !== null);

setupAuth(nuxtApp, loginError);

onMounted(async () => {
  refreshUser(nuxtApp);
  return;
});
</script>
