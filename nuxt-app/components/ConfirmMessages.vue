<template>
  <div class="confirmationMessages">
    <ConfirmMessage
      v-for="message of $confirmMessages.value"
      :message="message"
    />
  </div>
</template>
