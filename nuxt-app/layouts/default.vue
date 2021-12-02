<template>
  <NavigationBar>
    <template #menu> </template>
  </NavigationBar>

  <slot v-if="authenticated" />
  <Login v-else />
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
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
