<template>
  <div class="imageInput">
    <!-- If there is an image preview -->
    <div
      class="preview"
      v-if="imageUrl"
      :style="{ background: 'url(' + previewUrl + ')' }"
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
  imageUrl: {
    type: String,
    default: '',
  },
  modelValue: {
    type: File,
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Afbeelding uploaden',
  },
});
const emit = defineEmits(['update:modelValue']);

const previewUrl = ref<String>(props.imageUrl);

const updateImage = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  previewUrl.value = files?.[0] ? URL.createObjectURL(files[0]) : '';
  console.log({ files, url: previewUrl.value });
  emit('update:modelValue', files[0]);
};

const removeImage = () => {
  previewUrl.value = '';
  emit('update:modelValue', null);
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
