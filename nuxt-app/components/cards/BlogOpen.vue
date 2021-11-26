<template>
  <div class="BlogOpenWrapper">
    <section class="actionButtons">
      <Button
        size="small"
        state="primary"
        icon="arrow_back"
        @click="$emit('clickBackToNews')"
      >
        Terug naar nieuwsfeed
      </Button>
      <Button
        v-if="User.isOwner(blog?.poster.userId)"
        size="small"
        icon="edit"
        @click="$emit('clickEdit')"
        >Aanpassen</Button
      >
    </section>

    <section
      class="image"
      v-if="blog?.photoMetaData"
      :style="'background: url(' + blog?.getPhotoUrl() + ')'"
    />

    <section class="content">
      <div class="titles">
        <div>
          <div class="header">{{ blog?.title }}</div>
          <div class="date">{{ blog?.datePosted }}</div>
        </div>
        <Avatar
          :src="blog?.poster.getPhotoUrl()"
          :name="blog?.poster.fullName"
        />
      </div>
      {{ blog?.content }}
    </section>

    <section class="comments">
      <div class="commentTitle">Reageersels</div>
      <div class="comment" v-for="comment in blog?.comments || []">
        <div>
          {{ comment.comment }}
          <div class="author">{{ comment.poster.fullName }}</div>
        </div>
        <div class="actions">
          <Button
            v-if="User.isOwner(comment.poster.userId)"
            size="tiny"
            icon="delete"
            state="destructive"
            @click="blog?.deleteComment(nuxtApp, comment.id)"
          />
        </div>
      </div>

      <div class="newComment">
        <Textarea
          size="large"
          placeholder="nieuw reactie"
          :minRows="2"
          ref="textAreaRef"
          v-model="newComment"
        />
      </div>
    </section>

    <section class="actionButtons bottomActions">
      <Button
        v-if="blog?.canShare()"
        size="small"
        state="primary"
        icon="share"
        @click="blog?.share"
      >
        Delen
      </Button>
      <Button
        size="small"
        :state="likedState"
        icon="celebration"
        @click="blog?.toggleLike(nuxtApp)"
      >
        {{ likes }}
      </Button>
      <Button size="small" icon="reply" @click="comment">Reageer</Button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { NuxtApp } from '../../models/nuxtApp';
import { User } from './../../models/user';
import { Blog } from './../../models/posts/blogs';

import Avatar from './../Avatar.vue';
import Button from './../Button.vue';
import Textarea from './../inputs/Textarea.vue';

const props = defineProps<{
  blog: Blog;
}>();

const nuxtApp = useNuxtApp() as unknown as NuxtApp;
const newComment = ref('');
const textAreaRef = ref();

const comment = async () => {
  await props.blog?.comment(nuxtApp, newComment.value);
  textAreaRef.value?.clearTextarea();
};

const likedState = computed(() => {
  const likedBy = Array.from(props.blog?.likedBy || []);
  const { $user } = useNuxtApp() as unknown as NuxtApp;

  if (!$user?.value) return 'default';
  if (!likedBy.includes($user.value.userId)) return 'default';
  return 'primary';
});

const likes = computed(() => {
  if (!props.blog) return 'like';
  if (props.blog.likedBy.length == 1)
    return props.blog.likedBy.length + ' kudo';
  return props.blog.likedBy.length + ' kudos';
});
</script>

<style lang="scss" scoped>
.BlogOpenWrapper {
  width: 40rem;
  max-width: 90vw;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  gap: var(--margin-medium);
}

.actionButtons {
  display: flex;
  gap: var(--margin-small);

  &.bottomActions {
    justify-content: end;
  }
}

.image {
  width: 100%;
  height: 15rem;
  border-radius: var(--corner-radius);
  background-size: cover !important;
  background-position: center center !important;
}

.content {
  background: var(--white-color);
  padding: var(--padding-medium);
  border-radius: var(--corner-radius);

  & .titles {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & .header {
      font-size: var(--header);
    }

    & .date {
      font-size: var(--small);
      color: var(--grey-color-800);
    }
  }
}

.comments {
  & .commentTitle {
    font-size: var(--subheader);
    font-weight: bold;
  }

  & .comment {
    margin-top: var(--margin-small);
    background: var(--grey-color-400);
    border-radius: var(--corner-radius-small);
    padding: var(--padding-small);
    display: flex;
    justify-content: space-between;

    & .author {
      font-size: var(--small);
      color: var(--grey-color-800);
    }

    & .actions {
      display: flex;
      gap: var(--margin-small);

      & button:not(.active) {
        --bg: var(--grey-color-500);
        --color: var(--grey-color-800);
      }
    }
  }

  & .newComment {
    --bg: var(--grey-color-500);
    margin-top: 0.5rem;
  }
}
</style>
