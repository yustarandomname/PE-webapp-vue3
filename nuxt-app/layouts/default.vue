<template>
  <!-- Navigation bar -->
  <NavigationBar>
    <template #menu> </template>
  </NavigationBar>

  <!-- If user is authenticated -> show content | else -> show login screen -->
  <slot v-if="authenticated" />
  <Login v-else />

  <!-- If there are any confirmation messages to be displayed -> display them -->
  <div class="confirmationMessages" v-if="$confirmMessages">
    <ConfirmMessage
      v-for="message in $confirmMessages.value"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import ConfirmMessage from '@/components/ConfirmMessage.vue';
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
