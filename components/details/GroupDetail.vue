<template>
  <div :class="{ lessDetail }">
    <Button
      v-if="lessDetail"
      class="backButton"
      size="tiny"
      icon="arrow_back"
      @click="$goBackDetail"
    ></Button>

    <div class="infoGrid">
      <Avatar
        class="profile"
        :hideName="true"
        :groupId="groupData.id"
        :dontOpenDetail="true"
        size="huge"
      >
        <div class="yearGroup">Sinds: {{ groupData.created_year }}</div>
      </Avatar>

      <section class="actions">
        <Button v-if="lessDetail" @click="meerInfo">Meer info</Button>
        <template v-if="isMember">
          <Button disabled>Foto wijzigen</Button>
          <Button disabled>Profiel aanpassen</Button>
        </template>
        <template v-else>
          <Button @click="emailGroup">Stuur email</Button>
          <Button disabled>Vraag lidmaatschap aan</Button>
        </template>
      </section>

      <section class="content">
        <div class="groupName">{{ groupData.name }}</div>

        <div class="groupData">
          <template v-for="infoItem in groupData.getGroupInfo()">
            <div class="groupDataLabel">{{ infoItem.label }}:</div>
            <div class="groupDataValue" v-if="infoItem.value">
              {{ infoItem.value }}
            </div>
            <div class="groupDataValue noData" v-else>
              Geen {{ infoItem.label.toLowerCase() }} gevonden
            </div>
          </template>
        </div>

        <div class="blogs">
          <div class="subtitle">Blogs</div>
          <CompactBlog
            v-for="blog in groupBlogs"
            :blog="new Post(blog)"
            @click="openBlog(blog.id)"
          ></CompactBlog>
        </div>

        <div class="members">
          <div class="subtitle">Leden</div>

          <div
            class="member isUser"
            v-for="member in members.filter(
              (m) => m.is_former_member == false && m.user_id == user.id
            )"
          >
            <Avatar
              :userId="member.user_id"
              fullName
              align="right"
              size="small"
            />
            <div class="role" v-if="member.functie">{{ member.functie }}</div>
          </div>
          <div
            v-for="member in members.filter(
              (m) => m.is_former_member == false && m.user_id != user.id
            )"
            :key="member.id"
            class="member"
          >
            <Avatar
              :userId="member.user_id"
              fullName
              align="right"
              size="small"
            />
            <div class="role" v-if="member.functie">{{ member.functie }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import Button from '@/components/buttons/Button.vue';
import CompactBlog from '@/components/blogs/CompactBlog.vue';

import { GroupData, GroupMember } from '~~/models/GroupData';
import { Post } from '@/models/Post';
import { openBlog } from '@/util/router';

const props = defineProps<{ groupData: GroupData; lessDetail?: boolean }>();
const user = useUser();

const groupBlogs = ref<Post[]>([]);
const members = ref<GroupMember[]>([]);
const isMember = computed(() => {
  if (!useUser()?.value?.id) return false;
  if (!members.value?.length) return false;

  const userIsInMembers = members.value.some(
    (member) => member.user_id === useUser().value.id
  );
  return userIsInMembers;
});

const meerInfo = () => {
  const { $router, $closeDetail } = useNuxtApp();
  $router.push({ name: 'groepen', query: { group: props.groupData.id } });
  $closeDetail();
};
const emailGroup = () =>
  (document.location.href = `mailto:${props.groupData.email}`);

onMounted(async () => {
  groupBlogs.value = await props.groupData?.getLastPosts();
  members.value = await props.groupData?.getMembers();
});
</script>

<style scoped lang="scss">
.backButton {
  position: absolute;
}

.infoGrid {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  gap: var(--spacing-600);
  grid-template-areas: 'profile content' 'actions content';
}

.profile {
  grid-area: profile;

  .yearGroup {
    position: absolute;
    right: 0;
    top: 80%;
    transform: translateY(-50%);
    background: var(--secondary-color-500);
    padding: var(--spacing-100) var(--spacing-200);
    font-family: sans-serif;
    font-size: var(--subheader);
    border-radius: var(--corner-radius-large);
  }
}
.actions {
  grid-area: actions;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);
}

.content {
  grid-area: content;
  overflow: auto;

  & .groupName {
    font-size: var(--subtitle);
    margin-bottom: var(--spacing-300);
  }

  & .groupData {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-200) var(--spacing-500);

    & .groupDataLabel {
      font-weight: var(--thicc);
    }

    & .groupDataValue {
      font-weight: var(--light);
      font-size: var(--small);
    }

    & .noData {
      color: var(--grey-color-500);
    }
  }

  & .subtitle {
    font-size: var(--subheader);
    font-weight: var(--thicc);
    margin: var(--spacing-500) 0 var(--spacing-100);
  }

  .members {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-200);
  }

  .member {
    display: flex;
    padding: var(--spacing-200);
    border-radius: var(--corner-radius);
    background: var(--grey-color-200);
    align-items: center;
    justify-content: space-between;

    &.isUser {
      border: 2px solid var(--primary-color-500);
      background: var(--primary-color-200);
    }
  }
}

.lessDetail .content {
  max-height: min(100vh - 10rem, 30rem);
}

@media screen and (max-width: 45rem) {
  .infoGrid {
    grid-template-columns: auto 1fr;
    grid-template-areas: 'profile actions' 'content content';
  }

  .lessDetail {
    .infoGrid {
      grid-template-areas: 'content content' 'profile actions';
    }

    .content > .userData,
    .content > .blogs {
      display: none;
    }
  }
}

@media screen and (max-width: 35rem) {
  .infoGrid {
    grid-template-columns: 1fr !important;
    grid-template-areas: 'profile' 'content' 'actions';
  }

  .lessDetail .infoGrid {
    grid-template-areas: 'profile' 'actions' 'content';
  }

  .profile {
    margin: 0 auto;
  }
}
</style>
