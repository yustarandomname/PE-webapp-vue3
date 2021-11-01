<template>
  <h1>Welcome to Nuxt.js!!!</h1>
  <Avatar>test</Avatar>
</template>

<script>
import { Avatar } from "@/components/Avatar";
export default {
  components: { Avatar },
};
</script>

<style lang="scss">
h1 {
  color: blue;

  &:hover {
    color: #0f0;
  }
}
</style>
