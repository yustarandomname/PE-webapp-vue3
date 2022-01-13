<template>
  <div>
    <ActionButtons>
      <Button icon="arrow_back" @click="goBack">Terug</Button>
    </ActionButtons>
    <Container>
      <GroupDetail v-if="groupData" :groupData="groupData" />
    </Container>
  </div>
</template>

<script setup lang="ts">
import ActionButtons from '~~/components/buttons/ActionButtons.vue';
import Button from '~~/components/buttons/Button.vue';

import Container from '@/components/Container.vue';
import GroupDetail from '~~/components/details/GroupDetail.vue';

import { GroupData } from '~~/models/GroupData';

const groupData = ref<GroupData>();
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

  if (query?.group) {
    groupData.value = await GroupData.getGroupById(query.group as string);
  }
});
</script>
