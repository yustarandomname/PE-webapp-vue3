<template>
  <div>
    <section class="actionButtons">
      <Button
        size="small"
        state="primary"
        icon="arrow_back"
        @click="$router.push('/')"
      >
        Terug naar blogs
      </Button>

      <!--TODO: add this capibility -->
      <Button
        v-if="false"
        size="small"
        icon="edit"
        @click="log('open popup toegang aanpassen')"
      >
        Toegang aanpassen
      </Button>
    </section>

    <Image :imageUrl="blog?.getPhotoUrl()" v-model="newImage" />

    <Texteditor v-model="rawText" />

    <section class="actionButtons bottomActions">
      <Button
        size="small"
        state="destructive"
        icon="delete"
        @click="deleteBlog"
      >
        Verwijderen
      </Button>

      <Button
        v-if="false"
        size="small"
        icon="cloud_upload"
        @click="log('opslaan')"
      >
        Opslaan
      </Button>
      <Button size="small" state="primary" icon="edit" @click="publishBlog">
        {{ edit ? 'Bewerken' : 'Publiceren' }}
      </Button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Message } from './../../models/confirmMessage';
import { Blog } from './../../models/posts/blogs';
import { PropType } from 'vue';
import Image from '@/components/inputs/Image.vue';
import Texteditor from './../inputs/Texteditor.vue';

const props = defineProps({
  blog: {
    type: Object as PropType<Blog>,
    required: true,
  },
  edit: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

// Make typescript aware of the emits
const emit = defineEmits<{
  (e: 'delete'): void;
  (e: 'publish', title: string, content: string, newImage?: File): void;
}>();

const rawText = ref(props.blog.getRawData());
const newImage = ref<File>();
const uploadData = computed(() => {
  const dom = new DOMParser().parseFromString(rawText.value, 'text/html');
  const domTitle = dom.body.firstChild as HTMLHeadingElement;
  const domContentBody = dom.body;
  domContentBody.firstElementChild.remove();

  if (domTitle?.tagName != 'H1') return; // TODO show error
  if (domTitle.textContent.length > 140) return; // TODO show error

  return { title: domTitle.textContent, content: domContentBody.innerHTML };
});

const publishBlog = () => {
  const title = uploadData.value.title;
  const content = uploadData.value.content;
  const image = newImage?.value?.name ? newImage.value : null;
  emit('publish', title, content, image);
};

const deleteBlog = () => {
  const { $removeConfirmMessage, $addConfirmMessage } = useNuxtApp();

  const confirmMessage: Message = {
    title: 'Heel zeker?',
    content: 'Weet je zeker dat je deze blog wilt verwijderen?',
    hasCancelButton: true,
    cancelButtonText: 'Niet verwijderen',
    acceptButton: {
      text: 'Ja heel zeker!',
      action: () => {
        emit('delete');
        $removeConfirmMessage(confirmMessage);
      },
    },
  };

  $addConfirmMessage(confirmMessage);
};

const log = (log: string) => console.log(log);
</script>

<style scoped lang="scss">
.actionButtons {
  width: var(--width-large);
  margin: 1rem auto 0;
  max-width: 90vw;
  display: flex;
  flex-wrap: wrap;
  gap: var(--margin-small);

  &.bottomActions {
    justify-content: end;
    margin-bottom: 5rem;
  }
}

.image {
  width: var(--width-large);
  max-width: 90vw;
  height: 15rem;
  background-size: cover !important;
  background-position: center !important;
  margin: 0.5rem auto;
  border-radius: var(--corner-radius);
  position: relative;

  & .uploadButton {
    position: absolute;
    right: 1rem;
    bottom: 0.75rem;
  }
}
</style>
