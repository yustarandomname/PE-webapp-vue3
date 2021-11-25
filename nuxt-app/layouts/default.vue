<template>
  <NavigationBar :user="user">
    <template #menu> </template>
  </NavigationBar>

  <Login v-if="!authenticated" :error="loginError" />
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { setupAuth, refreshUser } from './../util/authentication';
import type { user } from '../types/user';

export default defineComponent({
  name: 'defaultNavigationBar',
  inheritAttrs: false, // workaround for nuxt3 (warning) bug
  setup() {
    const nuxtApp = useNuxtApp();
    const loginError = ref<string | undefined>(undefined);

    setupAuth(nuxtApp, loginError);

    onMounted(async () => refreshUser(nuxtApp));

    return {
      authenticated: nuxtApp.$authenticated as boolean,
      user: nuxtApp.$user as user,
      loginError,
    };
  },
});
</script>
