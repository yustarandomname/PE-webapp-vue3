<template>
  <div>
    <NavigationBar :key="$user.value?.userId" />

    <!-- If user is authenticated -> show content | else -> show login screen -->
    <slot v-if="true"></slot>
    <Login v-else />

    <Modal v-if="$userDetail?.value" class="detail" @close="$closeDetail">
      <UserDetail
        v-if="$userDetail?.value"
        :userData="$userDetail?.value"
        lessDetail
      />
    </Modal>
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
import Modal from '@/components/Modal.vue';
import UserDetail from '@/components/details/UserDetail.vue';

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
