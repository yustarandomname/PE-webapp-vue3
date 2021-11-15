<script lang="ts">
import { defineComponent, ref } from "vue";

import Avatar from "./Avatar.vue";
import Modal from ".//Modal.vue";

export default defineComponent({
  name: "NavigationBar",
  components: {
    Avatar,
    Modal,
  },
  props: {
    userName: {
      type: String,
    },
    userAvatar: {
      type: String,
    },
  },
  setup() {
    const menu = ref(false);

    const toggleMenu = () => {
      menu.value = !menu.value;
    };

    const closeMenu = () => {
      menu.value = false;
    };

    return { menu, toggleMenu, closeMenu };
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="navigationBar">
      <NuxtLink to="./">
        <div class="logo"></div>
      </NuxtLink>
      <Avatar
        v-if="userName || userAvatar"
        :src="userAvatar"
        @click="toggleMenu"
        >{{ userName }}</Avatar
      >
    </div>

    <Modal v-if="menu" @close="closeMenu">
      <slot name="menu" />
    </Modal>
  </div>
</template>

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
  background: #ffffff6e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 101;

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
