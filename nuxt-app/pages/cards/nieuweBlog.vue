<template>
  <BlogEditor :blog="blog" @back="$router.push('/')" @delete="deleteBlog" />
</template>

<script setup lang="ts">
import { Message } from './../../models/confirmMessage';
import { Blog } from './../../models/posts/blogs';
import { PostInterface, Poster } from './../../models/posts/post';
import BlogEditor from '@/components/cards/BlogEditor.vue';

const poster = new Poster(0, 'test123', null, { ORIGINAL: '', MEDIUM: '' });

const post: PostInterface = {
  id: 0,
  title: 'Titel',
  poster,
  content: '<p>content</p>',
  posterType: 'user',
  comments: [],
  likedBy: [],
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  datePosted: new Date().toDateString(),
  type: 'blog',
};
const blog = new Blog(post);

const deleteBlog = () => {
  const { $router, $removeConfirmMessage, $addConfirmMessage } = useNuxtApp();

  const confirmMessage: Message = {
    title: 'Heel zeker?',
    content: 'Weet je zeker dat je deze blog wilt verwijderen?',
    hasCancelButton: true,
    cancelButtonText: 'Niet verwijderen',
    acceptButton: {
      text: 'Ja heel zeker!',
      action: () => {
        $router.push('/');
        $removeConfirmMessage(confirmMessage);
      },
    },
  };

  $addConfirmMessage(confirmMessage);
};
</script>
