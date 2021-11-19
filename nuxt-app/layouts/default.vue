<template>
  <NavigationBar :userName="user?.fullname" :userAvatar="user?.avatar" />

  <Login v-if="!authenticated" />
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { User } from "../types/user";
import { $fetch } from 'ohmyfetch';

export default defineComponent({
  name: "defaultNavigationBar",
  setup() {
    const nuxtApp = useNuxtApp();
    const user: User = {
      id: "1",
      fullname: "Bestuuur",
      avatar:
        "https://proteus-eretes.nl/fotodir/12/7619863282148583613195970945632825098817142836418924819294100046_tumb.jpg",
      url: "https://proteus-eretes.nl/groepen/commissie/id:2",
    };

    if (!nuxtApp.$user) nuxtApp.provide("user", ref<null | User>(null));

    if (!nuxtApp.$authenticated)
      nuxtApp.provide("authenticated", ref<boolean>(false));

    nuxtApp.provide("signIn", async (email: string, password: string) => {
      await nuxtApp.$httpClient('/sanctum/csrf-cookie');
      await nuxtApp.$httpClient('/v1/auth/login', {
        method: 'POST',
        data: { email, password },
      });
      const { data } = await nuxtApp.$httpClient('/v1/auth/me');

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
