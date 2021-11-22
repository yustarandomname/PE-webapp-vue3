<template>
  <NavigationBar :user="user">
    <template #menu> </template>
  </NavigationBar>

  <Login v-if="!authenticated" />
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { user } from "../types/user";
import axios from "axios";

export default defineComponent({
  name: "defaultNavigationBar",
  inheritAttrs: false,
  setup() {
    const nuxtApp = useNuxtApp();

    const createClient = () =>
      axios.create({
        // baseURL: process.env.VUE_APP_ROOT_API,
        baseURL: "http://localhost:8000",
        timeout: 5000,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

    const refreshUser = async () => {
      const userString = window.localStorage.getItem("user");

      // Set local user to be equal to the user in local storage
      if (userString) {
        nuxtApp.$user.value = JSON.parse(userString);
        nuxtApp.$authenticated.value = true;
      }

      // Check with server if user is truly logged in
      const { data } = await nuxtApp.$httpClient("/v1/auth/me");
      window.localStorage.setItem("user", JSON.stringify(data));

      nuxtApp.$user.value = data;

      return data;
    };

    const signIn = async (email: string, password: string) => {
      await nuxtApp.$httpClient("/sanctum/csrf-cookie");
      await nuxtApp.$httpClient("/v1/auth/login", {
        method: "POST",
        data: { email, password },
      });

      return refreshUser();
    };

    const signOut = () => {
      nuxtApp.$httpClient("/v1/auth/logout");
      window.localStorage.removeItem("user");
      nuxtApp.$user.value = null;
      nuxtApp.$authenticated.value = false;
    };

    if (!nuxtApp.$httpClient) nuxtApp.provide("httpClient", createClient());

    if (!nuxtApp.$user) nuxtApp.provide("user", ref<null | user>(null));

    if (!nuxtApp.$authenticated)
      nuxtApp.provide("authenticated", ref<boolean>(false));

    if (!nuxtApp.$signIn) nuxtApp.provide("signIn", signIn);

    if (!nuxtApp.$signOut) nuxtApp.provide("signOut", signOut);

    onMounted(async () => refreshUser());

    return {
      authenticated: nuxtApp.$authenticated as boolean,
      user: nuxtApp.$user as user,
      signOut,
    };
  },
});
</script>
