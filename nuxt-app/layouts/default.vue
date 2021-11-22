<template>
  <NavigationBar :userName="user?.fullname" :userAvatar="user?.avatar" />

  <Login v-if="!authenticated" />
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { User } from "../types/user";
import axios from "axios";

export default defineComponent({
  name: "defaultNavigationBar",
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

    if (!nuxtApp.$httpclient) nuxtApp.provide("httpClient", createClient());

    if (!nuxtApp.$user) nuxtApp.provide("user", ref<null | User>(null));

    if (!nuxtApp.$authenticated)
      nuxtApp.provide("authenticated", ref<boolean>(false));

    nuxtApp.provide("signIn", async (email: string, password: string) => {
      await nuxtApp.$httpClient("/sanctum/csrf-cookie");
      await nuxtApp.$httpClient("/v1/auth/login", {
        method: "POST",
        data: { email, password },
      });
      const { data } = await nuxtApp.$httpClient("/v1/auth/me");

      nuxtApp.$user.value = data;
      nuxtApp.$authenticated.value = true;
    });

    nuxtApp.provide("signOut", () => {
      nuxtApp.$user.value = null;
      nuxtApp.$authenticated.value = false;
    });

    return {
      authenticated: nuxtApp.$authenticated,
      user: nuxtApp.$user,
    };
  },
});
</script>
