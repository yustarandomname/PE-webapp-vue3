<template>
  <NavigationBar
    userName="Webcie"
    userAvatar="https://proteus-eretes.nl/fotodir/0/0_tumb.jpg"
  />

  <slot />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "defaultNavigationBar"
})
</script>
