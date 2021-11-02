<template>
  <div>
    <h1>Welcome to Nuxt.js!!!</h1>
    <Avatar>test</Avatar>
    <Button>test</Button>
    <Grid>
      <div>item1</div>
      <div>item1</div>
      <div>item1</div>
      <div>item1</div>
    </Grid>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
import Grid from "@/components/Grid.vue";
export default {
  components: { Avatar, Button, Grid },
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
