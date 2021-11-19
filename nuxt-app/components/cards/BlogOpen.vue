<template>
  <div class="BlogOpenWrapper">
    <section class="actionButtons">
      <Button
        size="small"
        state="primary"
        icon="arrow_back"
        @click="backToNewsfeed"
      >
        Terug naar nieuwsfeed
      </Button>
      <Button size="small" icon="edit" @click="edit">Aanpassen</Button>
    </section>

    <section
      class="image"
      v-if="card?.image"
      :style="'background: url(' + card?.image + ')'"
    />

    <section class="content">
      <div class="titles">
        <div>
          <div class="header">{{ card?.header }}</div>
          <div class="date">{{ card?.datePosted }}</div>
        </div>
        <Avatar :src="card?.postedBy.avatar">{{
          card?.postedBy.fullname
        }}</Avatar>
      </div>
      {{ card?.content }}
    </section>

    <section class="comments">
      <div class="commentTitle">Reageersels</div>
      <div class="comment" v-for="comment in comments">
        <div>
          {{ comment.content }}
          <div class="author">{{ comment.user.fullname }}</div>
        </div>
        <div class="actions">
          <Button size="tiny" icon="celebration"> {{ comment.likes }}</Button>
          <Button size="tiny" icon="edit" />
          <Button size="tiny" icon="delete" />
        </div>
      </div>

      <div class="newComment">
        <Textarea
          size="large"
          placeholder="nieuw reactie"
          :minRows="2"
          v-model="newComment"
        />
      </div>
    </section>

    <section class="actionButtons bottomActions">
      <Button
        v-if="canShare"
        size="small"
        state="primary"
        icon="share"
        @click="share"
      >
        Delen
      </Button>
      <Button size="small" state="primary" icon="celebration" @click="like">
        {{ likes }}
      </Button>
      <Button size="small" icon="reply" @click="comment">Reageer</Button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Avatar from "./../Avatar.vue";
import Button from "./../Button.vue";
import Textarea from "./../inputs/Textarea.vue";
import type { Card as CardType } from "./../../types/card";

export default defineComponent({
  name: "BlogOpen",
  components: {
    Avatar,
    Button,
    Textarea,
  },
  props: {
    card: {
      type: Object as PropType<CardType>,
    },
  },
  setup(props, { emit }) {
    const { $user } = useNuxtApp();
    const backToNewsfeed = () => emit("clickBackToNews");
    const edit = () => emit("clickEdit");

    const canShare = ref(false);
    const comments = ref(props.card?.comments || []);
    const newComment = ref("");

    const share = async (e: Event) => {
      if (!e || !navigator || !navigator.share) return;

      const shareData = {
        title: props.card?.header,
        text: props.card?.content,
        url: "localhost:8000",
      };

      (await navigator?.share) && navigator.share(shareData);
    };
    const like = () => console.log("like");
    const comment = (e: Event) => {
      console.log(newComment.value);
      if (!e || !newComment.value) return; // if no comment content -> no comment

      const newCommentObj = {
        id: 123,
        user: $user,
        likes: 1,
        content: newComment.value,
      };

      comments.value.push(newCommentObj);
      newComment.value = "";
    };

    const likes = computed(() => {
      if (!props.card) return "like";
      if (props.card.likes == 1) return props.card.likes + " like";
      return props.card.likes + " likes";
    });

    onMounted(() => {
      if (!!navigator?.share) canShare.value = true; // init canShare
    });

    return {
      backToNewsfeed,
      edit,
      like,
      likes,
      share,
      canShare,
      comment,
      comments,
      newComment,
    };
  },
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
