<template>
  <div class="wrapper">
    <div class="navigationBar">
      <NuxtLink to="./">
        <div class="logo"></div>
      </NuxtLink>
      <Avatar
        v-if="user?.fullName || user?.photoMetaData.MEDIUM"
        :src="user.photoMetaData.MEDIUM"
        @click="toggleMenu"
        :name="user.fullName"
      />
    </div>

    <Modal v-if="menu" @close="closeMenu">
      <template #header> Header </template>
      <Button size="large" @click="signOut"> signOut</Button>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import type { user } from "../types/user";

import Avatar from "./Avatar.vue";
import Modal from ".//Modal.vue";

export default defineComponent({
  name: "NavigationBar",
  components: {
    Avatar,
    Modal,
  },
  props: {
    user: Object as PropType<user>,
  },
  setup() {
    const nuxtApp = useNuxtApp();
    const menu = ref(true);

    const toggleMenu = (e: Event) => {
      if (!e) return;

      menu.value = !menu.value;
    };

    const closeMenu = () => {
      menu.value = false;
    };

    const signOut = () => {
      nuxtApp.signOut();
      closeMenu();
    };

    return { menu, toggleMenu, closeMenu, signOut };
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  --padding-ver: 1rem;
  --padding-hor: min(2rem, 5vw);
  --height: 5rem;

  position: relative;
  height: var(--height);
}

.navigationBar {
  position: fixed;
  height: var(--height);
  width: 100vw;
  padding: var(--padding-ver) var(--padding-hor);
  top: 0;
  left: 0;
  background: #ffffffab;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 101;
  backdrop-filter: blur(7px) saturate(2);

  & > a {
    width: 100%;

    & .logo {
      height: 3rem;
      width: 100%;
      background: url(/logo.png);
      background-size: contain;
      background-position: left;
      background-repeat: no-repeat;
    }
  }
}
</style>
