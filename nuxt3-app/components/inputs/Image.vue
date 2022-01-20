<template>
  <div class="imageInput">
    <!-- If there is an image preview -->
    <div
      class="preview"
      v-if="imageUrl != 'none'"
      :style="{ background: imageUrl }"
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
        <UploadButton @change="updateImage" :loading="uploading">
          Andere afbeelding
        </UploadButton>
      </div>
    </div>
    <div v-else>
      <UploadButton @change="updateImage" :loading="uploading">
        {{ placeholder }}
      </UploadButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Post } from '@/models/post';
import Button from '@/components/buttons/Button.vue';
import UploadButton from '../buttons/UploadButton.vue';

const props = defineProps({
  blog: Object as PropType<Post>,
  placeholder: {
    type: String,
    default: 'Afbeelding uploaden',
  },
});

const imageUrl = ref<string>('none');
const uploading = ref<boolean>(false);

const updateImage = async (file: File) => {
  // 0. set button to (up)loading
  uploading.value = true;
  const fileName = 'banner';

  // 2. upload file to correct directory
  const storage = useStorage();
  const { error } = await storage
    .from('blogs')
    .upload(`${props.blog.id}/${fileName}`, file, {
      cacheControl: '3600',
      upsert: true,
    });
  if (error) {
    uploading.value = false;
    return;
  }

  // 4. update blog post with correct image directory
  const { error: error2 } = await props.blog.endpoint
    .update({ has_banner: true })
    .eq('id', props.blog.id);
  if (error2) {
    uploading.value = false;
    return;
  }

  // 5. update imageUrl
  imageUrl.value = `url(${URL.createObjectURL(file)})`;
  uploading.value = false;
};

const removeImage = async () => {
  const { error } = await props.blog.endpoint
    .update({ has_banner: false })
    .eq('id', props.blog.id);

  if (!error) imageUrl.value = 'none';
};

onMounted(async () => {
  const bannerUrl = await props.blog.bannerUrl();
  if (!bannerUrl) return;
  imageUrl.value = `url(${bannerUrl})`;
});
</script>

<style scoped lang="scss">
.imageInput {
  width: var(--width-large);
  margin: var(--spacing-400) auto;

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
    bottom: var(--spacing-400);
    right: var(--spacing-400);
    display: flex;
    display: flex;
    gap: var(--spacing-200);
    justify-content: flex-end;
  }
}

label .button {
  line-height: 2.45rem;
  background: red !important;
}

input {
  display: none;
}
</style>
