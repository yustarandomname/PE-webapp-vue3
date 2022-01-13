<template>
  <Modal>
    <template #header>Welkom bij de Proteus-Eretes app</template>
    <!-- TODO: Add text for users who have not logged in before -->
    <form @submit.prevent="recoverPassword">
      <Input
        type="password"
        size="medium"
        autocomplete="new-password"
        label="Wachtwoord"
        v-model="newPassword"
      />
      <Input
        type="password"
        size="medium"
        autocomplete="new-password"
        label="Wachtwoord herhalen"
        v-model="repeatPassword"
      />

      <Button state="primary" :loading="loading" @click.self="recoverPassword">
        Wachtwoord opslaan
      </Button>

      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { RecoverData } from '@/models/recoverData';
import Button from './buttons/Button.vue';
import Input from './inputs/Input.vue';
import Modal from './Modal.vue';

const props = defineProps<{ recoverData: RecoverData }>();

const auth = useAuth();

const newPassword = ref('');
const repeatPassword = ref('');
const error = ref('');
const loading = ref(false);

const recoverPassword = async (e: Event) => {
  if (!e || e.type != 'submit' || !loading) return;
  if (newPassword.value !== repeatPassword.value) {
    error.value = 'Wachtwoorden komen niet overeen';
    return;
  }

  loading.value = true;

  const { error: updateError } = await auth.api.updateUser(
    props.recoverData.access_token,
    { password: newPassword.value }
  );

  if (updateError?.message) {
    error.value = updateError.message;
    return;
  }

  useRouter().push({ path: '/' });
  error.value = '';
  loading.value = false;
};
</script>
