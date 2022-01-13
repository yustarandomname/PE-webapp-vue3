<template>
  <div>
    <ActionButtons>
      <Button icon="arrow_back" @click="goBack">Terug</Button>
    </ActionButtons>
    <Container>
      <UserDetail v-if="userData" :userData="userData" />
    </Container>
  </div>
</template>

<script setup lang="ts">
import ActionButtons from '~~/components/buttons/ActionButtons.vue';
import Button from '~~/components/buttons/Button.vue';

import Container from '@/components/Container.vue';
import UserDetail from '@/components/details/UserDetail.vue';

import { UserData } from '~~/models/UserData';

const userData = ref<UserData>();
const goBack = () => {
  const { $router, $goBackDetail } = useNuxtApp();

  if (window?.history?.length > 2) {
    $router.back();
    $goBackDetail();
    return;
  }

  $router.push('/');
};

onMounted(async () => {
  const query = useRouter().currentRoute.value.query;

  if (query?.user) {
    userData.value = await UserData.getUserById(query.user as string);
  }
});
</script>
