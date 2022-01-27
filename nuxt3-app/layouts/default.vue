<template>
  <div>
    <NavigationBar />

    <!-- If user is authenticated -> show content | else -> show login screen -->
    <slot v-if="authenticated"></slot>
    <Login v-else />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
  router: {
    mode: 'hash',
  },
};
</script>

<script setup lang="ts">
const authenticated = ref(false);

onMounted(async () => {
  const { $initUser, $user } = useNuxtApp();
  $initUser();
  watch($user, () => {
    if (!$user || !$user.value) {
      authenticated.value = false;
    } else {
      authenticated.value = true;
    }
  });
});
</script>

<style scoped lang="scss">
.confirmationMessages {
  position: fixed;
  bottom: 5vw;
  right: 5vw;
  width: 20rem;
  max-width: 90vw;
  z-index: 101;
}
</style>
