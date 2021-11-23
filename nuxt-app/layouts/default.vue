<template>
  <NavigationBar :user="user">
    <template #menu> </template>
  </NavigationBar>

  <Login v-if="!authenticated" :error="loginError" />
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { user } from '../types/user';
import axios from 'axios';

export default defineComponent({
  name: 'defaultNavigationBar',
  inheritAttrs: false,
  setup() {
    const nuxtApp = useNuxtApp();
    const loginError = ref<string | undefined>(undefined);

    const createClient = () =>
      axios.create({
        // baseURL: process.env.VUE_APP_ROOT_API,
        baseURL: 'http://localhost:8000',
        timeout: 5000,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const refreshUser = async (): Promise<{ user?: user; error?: Error }> => {
      const userString = window.localStorage.getItem('user');

      // Set local user to be equal to the user in local storage
      if (userString) {
        nuxtApp.$user.value = JSON.parse(userString);
        nuxtApp.$authenticated.value = true;
      }

      try {
        // Check with server if user is truly logged in
        const res = await nuxtApp.$httpClient('/v1/auth/me');

        if (!res) return { error: Error('No response from server') };

        window.localStorage.setItem('user', JSON.stringify(res.data));

        nuxtApp.$user.value = res.data as user;
        nuxtApp.$authenticated.value = true;

        return { user: res.data };
      } catch (error) {
        return { error: new Error('Gebruiker is niet ingelogd') };
      }
    };

    const signIn = async (email: string, password: string) => {
      await nuxtApp.$httpClient('/sanctum/csrf-cookie');

      try {
        await nuxtApp.$httpClient('/v1/auth/login', {
          method: 'POST',
          data: { email, password },
        });
      } catch (error) {
        loginError.value = 'Verkeerde email of wachtwoord';
        return;
      }

      const refreshResponse = await refreshUser();
      loginError.value = refreshResponse.error?.message;
    };

    const signOut = async () => {
      const res = await nuxtApp.$httpClient('/v1/auth/logout', {
        method: 'POST',
      });
      window.localStorage.removeItem('user');
      nuxtApp.$user.value = null;
      nuxtApp.$authenticated.value = false;
    };

    if (!nuxtApp.$httpClient) nuxtApp.provide('httpClient', createClient());

    if (!nuxtApp.$user) nuxtApp.provide('user', ref<null | user>(null));

    if (!nuxtApp.$authenticated)
      nuxtApp.provide('authenticated', ref<boolean>(false));

    if (!nuxtApp.$signIn) nuxtApp.provide('signIn', signIn);

    if (!nuxtApp.$signOut) nuxtApp.provide('signOut', signOut);

    onMounted(async () => refreshUser());

    return {
      authenticated: nuxtApp.$authenticated as boolean,
      user: nuxtApp.$user as user,
      loginError,
    };
  },
});
</script>
