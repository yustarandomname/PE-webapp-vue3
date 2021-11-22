<template>
  <NavigationBar
    :userName="user?.fullName"
    :userAvatar="user?.photoMetaData.MEDIUM"
  />

  <Login v-if="!authenticated" />
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { user } from "../types/user";
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

    const refreshUser = async () => {
      const { data } = await nuxtApp.$httpClient("/v1/auth/me");

      console.log(data);

      nuxtApp.$user.value = data;
      nuxtApp.$authenticated.value = true;

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
      nuxtApp.$user.value = null;
      nuxtApp.$authenticated.value = false;
    };

    if (!nuxtApp.$httpClient) nuxtApp.provide("httpClient", createClient());

    if (!nuxtApp.$user) nuxtApp.provide("user", ref<null | user>(null));

    if (!nuxtApp.$authenticated)
      nuxtApp.provide("authenticated", ref<boolean>(false));

    if (!nuxtApp.$signIn) nuxtApp.provide("signIn", signIn);

    if (!nuxtApp.$signOut) nuxtApp.provide("signOut", signOut);

    onMounted(async () => {
      const { data } = await nuxtApp.$httpClient("/v1/auth/me");
      if (data) {
        nuxtApp.$user.value = data;
        nuxtApp.$authenticated.value = true;
      }
    });

    return {
      authenticated: nuxtApp.$authenticated as boolean,
      user: nuxtApp.$user as user,
    };
  },
});
</script>
