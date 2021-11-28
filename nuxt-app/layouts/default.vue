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
import { User, UserInterface } from './../models/user';

export default defineComponent({
  name: 'defaultNavigationBar',
  inheritAttrs: false, // workaround for nuxt3 (warning) bug
  setup() {
    const nuxtApp = useNuxtApp();
    const loginError = ref<string>();

    const user = computed(() => {
      const user = nuxtApp.$user.value as UserInterface;
      if (!user) return;

      return new User(user);
    });

    setupAuth(nuxtApp, loginError);

    onMounted(async () => refreshUser(nuxtApp));

    return {
      authenticated: nuxtApp.$authenticated as boolean,
      user,
      loginError,
    };
  },
});
</script>
