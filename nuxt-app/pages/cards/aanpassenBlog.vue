<template>
  <div v-if="openedPost">
    <BlogEditor
      edit
      :blog="openedPost"
      @delete="deleteBlog"
      @publish="publishBlog"
    />
  </div>
</template>

<script setup lang="ts">
import BlogEditor from '@/components/cards/BlogEditor.vue';
import { Blog } from './../../models/posts/blogs';

const nuxtApp = useNuxtApp();
const openedPost = ref<Blog>();

const publishBlog = async (title: string, content: string, image?: File) => {
  openedPost.value.title = title;
  openedPost.value.content = content;
  const { data } = await openedPost.value.save(image, 'PUT');
  console.log(data);
  if (data) nuxtApp.$router.push('/');
};

const deleteBlog = async () => {
  await openedPost.value.delete();
  nuxtApp.$router.push('/');
};

onMounted(async () => {
  const cardId = nuxtApp.$router.currentRoute.value.query?.id;

  // Set card to open if url has an Id of a blog post
  openedPost.value = cardId ? await Blog.fetchBlog(cardId) : undefined;
});
</script>
