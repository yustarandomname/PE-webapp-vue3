<template>
  <div>
    <NavigationBar :key="user?.id">
      <template #menu> </template>
    </NavigationBar>

    <RecoverPassword v-if="recoverData" :recoverData="recoverData" />
    <Login v-else-if="!user" />
    <slot v-else></slot>

    <div class="confirmationMessages" v-if="$confirmMessages">
      <ConfirmMessage
        v-for="message in $confirmMessages.value"
        :message="message"
      />
    </div>

    <Modal
      v-if="$groupDetail?.value || $userDetail?.value"
      class="detail"
      @close="$closeDetail"
    >
      <GroupDetail
        v-if="$groupDetail?.value"
        :groupData="$groupDetail?.value"
        lessDetail
      />
      <UserDetail
        v-else-if="$userDetail?.value"
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
import NavigationBar from '@/components/NavigationBar.vue';
import RecoverPassword from '@/components/RecoverPassword.vue';
import UserDetail from '@/components/details/UserDetail.vue';
import { RecoverData } from '@/models/recoverData';
import GroupDetail from '~~/components/details/GroupDetail.vue';

const nuxtApp = useNuxtApp();
const user = useUser();

const recoverData = computed<RecoverData>(() => {
  let routeHash: string = nuxtApp?.$router?.currentRoute.value?.hash;
  if (!routeHash) return;

  routeHash = routeHash.replace('#', '');
  const data: string[] = routeHash.split('&');

  const recoveredData = data.reduce((obj, item) => {
    const [key, value] = item.split('=');
    obj[key] = value;
    return obj;
  }, {} as RecoverData);

  if (recoveredData.type !== 'recovery') return;
  console.log({ recoveredData });
  return recoveredData;
});
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
