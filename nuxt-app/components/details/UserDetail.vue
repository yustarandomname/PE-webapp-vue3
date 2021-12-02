<template>
  <div class="userDetail">
    <Avatar class="avatar" size="huge" />

    <!-- Action buttons -->
    <section class="actions">
      <Button @click="email">Mail</Button>
      <Button @click="phone">Bellen</Button>
      <Button @click="whatsapp">WhatsApp</Button>
    </section>

    <section class="info">
      <div class="name">{{ user?.fullName }}</div>
      <div class="infoGrid">
        <div class="infoItem">
          <div class="label">Adress</div>
          <div class="value">Pijlstaartpad 15 Delft</div>
        </div>
        <div class="infoItem">
          <div class="label">Bio</div>
          <div class="value">Meer webcie, meer beter</div>
        </div>
      </div>
    </section>

    <section class="groups">
      {{ user?.groups }}
    </section>
  </div>
</template>

<script setup lang="ts">
import type { User } from './../../models/User';

const props = defineProps<{ user: User }>();

const email = () => console.log('email'); // TODO
const phone = () => console.log('phone'); // TODO
const whatsapp = () => console.log('whatsapp'); // TODO

onMounted(() => {
  console.log('mounted', props);
});
</script>
