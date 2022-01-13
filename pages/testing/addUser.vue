<template>
  <Container>
    <Input v-model="email" />
    <Button @click="createUser">Add user</Button>
  </Container>
</template>

<script setup lang="ts">
import Input from '@/components/inputs/Input.vue';
import Container from '~~/components/Container.vue';
import Button from '@/components/buttons/Button.vue';

const email = ref('');

const createUser = () =>
  useAuth().signUp({ email: email.value, password: 'webcie' });
</script>

<style scoped lang="scss"></style>
