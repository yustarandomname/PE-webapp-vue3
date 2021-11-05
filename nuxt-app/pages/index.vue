<template>
  <div>
    <NavigationBar userName="Webcie" userAvatar=""/>

    
    <h1>Welcome to Nuxt.js!!!</h1>
    <ion-icon name="heart"></ion-icon>

    <!-- <Button @click="openModal">Open Modal</Button>

    <Modal title="Modal" v-if="modalState" @close="toggleModal">
      <h1>This is a modal</h1>
    </Modal> -->
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
import InfiniteList from "@/components/InfiniteList.vue";

import {ref, defineComponent} from "vue";

export default defineComponent({
  components: { Avatar, Button, InfiniteList },
  setup() {
    const modalState = ref(false);

    const openModal = () => {
      modalState.value = true
    }

    const toggleModal = () => {
      modalState.value = !modalState.value
    }

    return {modalState, openModal, toggleModal}
  }
});
</script>

<style lang="scss">
h1 {
  color: blue;

  &:hover {
    color: #0f0;
  }
}
</style>
