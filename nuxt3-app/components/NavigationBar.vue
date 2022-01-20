<template>
  <div class="wrapper">
    <div class="navigationBar">
      <div class="logo"></div>
      <div v-if="userData" :key="userData?.userId">
        <Avatar
          v-if="$user"
          :dontOpenDetail="true"
          :userId="$user.value.userId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User } from '@/models/user';

import Avatar from './Avatar.vue';

const userData = ref<User>();

onMounted(async () => {
  userData.value = await User.getUserById();
});
</script>

<style scoped lang="scss">
.wrapper {
  --spacing-ver: var(--spacing-400);
  --spacing-hor: min(1rem, 5vw);
  --navigationbar-height: 5rem;

  position: relative;
  height: var(--navigationbar-height);
  margin-bottom: var(--spacing-600);
}
.navigationBar {
  position: fixed;
  height: var(--navigationbar-height);
  width: 100vw;
  padding: var(--spacing-ver) var(--spacing-hor);
  top: 0;
  left: 0;
  background: var(--navigation-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 101;
  backdrop-filter: blur(7px) saturate(2);

  & .logo {
    height: 3rem;
    width: 100%;
    background: url(/logo.svg);
    background-size: contain;
    background-position: left;
    background-repeat: no-repeat;
  }
}

@media (max-width: 40rem) {
  .logo {
    background-image: url(/logo-small.svg) !important;
  }
}
</style>
