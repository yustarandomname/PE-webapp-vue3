<template>
  <Container style="--container-background: none">
    <ActionButtons>
      <Button size="small" state="primary" icon="arrow_back" @click="goBack">
        Terug naar nieuwsfeed
      </Button>
      <Button v-if="isOwner" size="small" icon="edit" @click="editBlog">
        Aanpassen
      </Button>
    </ActionButtons>

    <!-- IMAGE -->
    <section
      class="image"
      v-if="blog.photoMetaData"
      :style="'background:' + blog.getPhotoUrl()"
    ></section>

    <!-- CONTENT -->
    <section class="content">
      <div class="header">
        <div class="title">{{ blog.title }}</div>
        <div class="date">Insert correct date</div>
      </div>
      <div class="text" v-html="blog.content"></div>
    </section>

    <div class="author">
      <Avatar v-if="blog.poster.userId" :userId="blog.poster.userId" fullName />
    </div>

    <!-- COMMENTS -->
    <section v-if="true" class="comments">
      <div class="commentTitle">Opmerkingen</div>

      <div
        class="comment"
        v-for="comment in blog.comments || []"
        :key="comment.id"
      >
        <Avatar :align="'right'" fullName :userId="comment.poster.userId">
          <div class="avatarComment">{{ comment.comment }}</div>
        </Avatar>

        <div class="actions">
          <Button
            v-if="comment.currentUserIsOwner"
            size="tiny"
            icon="clear"
            state="destructive"
            @click="blog.deleteComment(comment.id)"
          ></Button>
        </div>
      </div>

      <div class="newComment">
        <Textarea
          size="large"
          placeholder="Schrijf een nieuwe reactie"
          ref="textAreaRef"
          v-model="newComment"
        ></Textarea>
      </div>

      <ActionButtons v-if="true" rightAlign bottom>
        <Button
          size="small"
          :state="kudoState"
          icon="celebration"
          @click="toggleKudo"
        >
          {{ kudos }}
        </Button>
        <Button
          size="small"
          :state="newComment ? 'default' : 'disabled'"
          icon="reply"
          @click="comment"
          >Reageer
        </Button>
      </ActionButtons>
    </section>
  </Container>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { Blog } from './../models/blog';

import Avatar from './../Avatar.vue';
import Container from '@/components/Container.vue';
import ActionButtons from '@/components/buttons/ActionButtons.vue';
import Button from '@/components/buttons/Button.vue';
import Textarea from '@/components/inputs/Textarea.vue';

const props = defineProps<{ blog: Blog }>();

const isOwner = computed(() => {
  const { $user } = useNuxtApp();
  return props.blog.poster.userId == $user.value.userId;
});
const newComment = ref('');
const textAreaRef = ref();

const kudos = computed(() => {
  if (!props.blog) return 'kudos';
  if (props.blog.likedBy.length == 1)
    return props.blog.likedBy.length + ' kudo';
  return props.blog.likedBy.length + ' kudos';
});

const kudoState = computed(() => {
  const likedBy = Array.from(props.blog?.likedBy || []);
  const { $user } = useNuxtApp();

  if (!$user?.value) return 'default';
  if (!likedBy.includes($user.value.userId)) return 'default';
  return 'primary';
});

const toggleKudo = computed(() => {
  if (!props.blog) return 'like';
  if (props.blog.likedBy.length == 1)
    return props.blog.likedBy.length + ' kudo';
  return props.blog.likedBy.length + ' kudos';
});

const comment = async () => {
  await props.blog?.comment(newComment.value);
  textAreaRef.value?.clearTextarea();
};

// NAVIGATION
const goBack = () => {
  const { $router } = useNuxtApp();
  $router.push({ path: '/', query: { from: props.blog.publish_date } });
};
const editBlog = () => {
  const { $router } = useNuxtApp();
  $router.push('/blogs/aanpassen?id=' + props.blog.id);
};
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 15rem;
  border-radius: var(--corner-radius);
  background-size: cover !important;
  background-position: center center !important;
  margin-bottom: var(--spacing-500);
}

.content {
  background: var(--white-color);
  padding: var(--spacing-400);
  border-radius: var(--corner-radius);

  .title {
    font-size: var(--title);
  }

  .date {
    font-weight: var(--thin);
  }
}

.author {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-top: var(--spacing-300);
}

.comments {
  & .commentTitle {
    font-size: var(--subheader);
    font-weight: bold;
  }

  & .comment {
    margin-top: var(--spacing-200);
    background: var(--white-color);
    border-radius: var(--corner-radius);
    padding: var(--spacing-200);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .avatarUserName:hover {
      text-decoration: underline;
    }

    .avatarComment {
      font-weight: bold;
      font-size: var(--normal);
    }

    & .actions {
      display: flex;
      margin-left: auto;
      gap: var(--spacing-200);

      & button:not(.active) {
        --bg: var(--grey-color-500);
        --color: var(--grey-color-800);
      }
    }
  }
}

.newComment {
  margin-top: var(--spacing-200);
}
</style>
