<template>
  <div>
    <h1>Welcome to Nuxt.js!!!</h1>
    <Avatar>test</Avatar>
    <Button>test</Button>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
export default {
  components: { Avatar, Button },
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
