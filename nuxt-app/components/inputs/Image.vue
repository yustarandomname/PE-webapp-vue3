<template>
  <div class="imageInput">
    <!-- If there is an image preview -->
    <div
      class="preview"
      v-if="imageUrl"
      :style="{ background: 'url(' + imageUrl + ')' }"
    >
      <div class="reuploadActions">
        <Button
          size="small"
          icon="delete"
          state="destructive"
          @click="removeImage"
        >
          Afbeelding verwijderen
        </Button>
        <label for="image-reupload">
          <div class="button size-small">
            <div>
              <i class="material-icons-outlined">cloud_upload</i>
              Andere afbeelding
            </div>
          </div>
        </label>
        <input
          id="image-reupload"
          type="file"
          accept="image/*"
          @change="updateImage"
        />
      </div>
    </div>
    <div v-else>
      <label for="image-upload">
        <div class="button size-small">
          <div>
            <i class="material-icons-outlined">cloud_upload</i>
            {{ placeholder }}
          </div>
        </div>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        @change="updateImage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Afbeelding uploaden',
  },
});
const emit = defineEmits(['update:modelValue']);

const imageUrl = ref<String>(props.modelValue);

const updateImage = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  imageUrl.value = files?.[0] ? URL.createObjectURL(files[0]) : '';
  emit('update:modelValue', imageUrl.value);
};

const removeImage = () => {
  imageUrl.value = '';
  emit('update:modelValue', '');
};
</script>

<style scoped lang="scss">
.imageInput {
  width: var(--width-large);
  margin: 1rem auto;

  & .preview {
    width: 100%;
    height: 20rem;
    position: relative;
    border-radius: var(--corner-radius);
    background-size: cover !important;
    background-position: center !important;
  }

  & .reuploadActions {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    display: flex;
    gap: var(--margin-small);
    justify-content: flex-end;
  }
}

label .button {
  line-height: 2.45rem;
}

input {
  display: none;
}
</style>
