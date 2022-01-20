<template>
  <div>
    <NavigationBar :key="$user?.value?.userId">
      <template #menu> </template>
    </NavigationBar>

    <Login v-if="!$user.value" />
    <slot v-else></slot>

    <div class="confirmationMessages" v-if="$confirmMessages">
      <ConfirmMessage
        v-for="message in $confirmMessages.value"
        :message="message"
      />
    </div>
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
import NavigationBar from '@/components/NavigationBar.vue';
</script>

<style scoped lang="scss">
.detail {
  --modal-width: var(--width-large);
  --modal-max-height: min(calc(100vh - 6rem), 35rem);
}

.confirmationMessages {
  position: fixed;
  bottom: 5vw;
  right: 5vw;
  width: 20rem;
  max-width: 90vw;
  z-index: 101;
}
</style>
