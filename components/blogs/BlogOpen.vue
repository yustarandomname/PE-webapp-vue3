<template>
  <Container style="--container-background: none">
    <ActionButtons>
      <Button size="small" state="primary" icon="arrow_back" @click="goBack">
        Terug naar nieuwsfeed
      </Button>
      <Button
        v-if="isOwner"
        size="small"
        icon="edit"
        @click="$router.push('/blogs/aanpassen?id=' + blog.id)"
      >
        Aanpassen
      </Button>
    </ActionButtons>

    <!-- IMAGE -->
    <section
      class="image"
      v-if="blog?.has_banner"
      :style="'background:' + imageUrl"
    ></section>

    <!-- CONTENT -->
    <section class="content">
      <div class="header">
        <div class="title">{{ blog?.title }}</div>
        <div class="date">{{ Post.formatDate(blog?.publish_date) }}</div>
      </div>
      <div class="text" v-html="blog?.htmlContent"></div>
    </section>

    <div class="author">
      <Avatar
        v-if="blog?.user_author_id"
        :userId="blog.user_author_id"
        fullName
      />
      <Avatar v-else-if="blog?.group_author" :groupId="blog.group_author" />
    </div>

    <!-- COMMENTS -->
    <section v-if="blog.comments_allowed" class="comments">
      <div class="commentTitle">Opmerkingen</div>

      <div class="comment" v-for="comment in comments" :key="comment.id">
        <Avatar :align="'right'" fullName :userId="comment.author">
          <div class="avatarComment">{{ comment.content }}</div>
        </Avatar>

        <div class="actions">
          <Button
            v-if="true"
            size="tiny"
            icon="clear"
            state="destructive"
          ></Button>
        </div>
      </div>

      <div class="newComment">
        <Textarea
          size="large"
          placeholder="Schrijf een nieuwe reactie"
          :minRows="2"
          ref="textAreaRef"
          v-model="newComment"
        ></Textarea>
      </div>

      <ActionButtons v-if="blog.comments_allowed" rightAlign bottom>
        <Button
          size="small"
          :state="kudoState"
          icon="celebration"
          @click="toggleKudo"
        >
          {{ kudos.length }} kudo{{ kudos.length != 1 ? 's' : '' }}
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
import { Post } from '@/models/Post';
import { Comment } from '@/models/comment';
import { PropType } from 'vue';

import Avatar from '@/components/Avatar.vue';
import Button from '@/components/buttons/Button.vue';
import Textarea from '@/components/inputs/Textarea.vue';
import ActionButtons from '@/components/buttons/ActionButtons.vue';

const props = defineProps({
  blog: {
    type: Object as PropType<Post>,
    required: false,
  },
});

const isOwner = ref(false);
const textAreaRef = ref();
const imageUrl = ref('none');
const comments = ref<Comment[]>([]);
const newComment = ref('');
const kudos = ref([]);
const kudoState = computed(() => {
  const user = useUser();
  if (!user.value) return 'disabled';
  if (kudos.value.includes(user.value.id)) return 'primary';
  return 'default';
});

const toggleKudo = async () => (kudos.value = await props.blog.toggleKudo());

const goBack = () => {
  const router = useRouter();
  router.push({ path: '/', query: { from: props.blog.publish_date } });
};

const comment = async () => {
  if (!newComment.value) return;

  const comment = await Comment.insert(props.blog.id, newComment.value);
  comments.value.push(comment);
  textAreaRef.value?.clearTextarea();
};

onMounted(async () => {
  if (!props.blog) return;
  kudos.value = props.blog.kudos || [];

  isOwner.value = await props.blog.isOwner();

  const fetchedComments = await props.blog.fetchComments();
  comments.value = fetchedComments;

  const bannerUrl = await props.blog.bannerUrl();
  if (!bannerUrl) return;
  imageUrl.value = `url(${bannerUrl})`;
});
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
