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
        :userId="userData.id"
        :dontOpenDetail="true"
        size="huge"
      >
        <div class="yearGroup">{{ userData.year_group }}</div>
      </Avatar>

      <div class="actions">
        <Button v-if="lessDetail" @click="meerInfo">Meer info</Button>
        <template v-if="isOwner">
          <Button disabled>Profiel aanpassen</Button>
          <Button disabled>Instellingen</Button>
          <Button state="primary" @click="logOut">Uitloggen</Button>
        </template>
        <template v-else>
          <Button @click="emailUser"> Stuur email </Button>
          <Button
            v-if="userData.phonenumber && !whatsappFailed"
            @click="whatsappUser"
          >
            Stuur Whatsapp
          </Button>
          <Button v-if="userData.phonenumber" @click="phoneUser">Bellen</Button>
        </template>
      </div>

      <section class="content">
        <div class="userName">{{ userData.fullName }}</div>

        <div class="userData">
          <template v-for="infoItem in userData.getUserInfo()">
            <div class="userDataLabel">{{ infoItem.label }}:</div>
            <div class="userDataValue" v-if="infoItem.value">
              {{ infoItem.value }}
            </div>
            <div class="userDataValue noData" v-else>
              Geen {{ infoItem.label.toLowerCase() }} gevonden
            </div>
          </template>
        </div>

        <div class="blogs">
          <div class="subtitle">Blogs</div>

          <Button
            v-if="!userBlogs?.length"
            size="large"
            @click="$router.push('/mijnposts')"
            :disabled="!isOwner"
          >
            {{ isOwner ? 'Maak je eerste blog aan' : 'Heeft nog geen blogs' }}
          </Button>

          <CompactBlog
            v-for="blog in userBlogs"
            :blog="new Post(blog)"
            @click="openBlog(blog.id)"
          ></CompactBlog>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import Button from '@/components/buttons/Button.vue';
import CompactBlog from '@/components/blogs/CompactBlog.vue';

import { UserData } from '~~/models/UserData';
import { Post } from '@/models/Post';
import { openBlog } from '@/util/router';
import phoneUtil from 'google-libphonenumber';

const props = defineProps<{ userData: UserData; lessDetail?: boolean }>();

const userBlogs = ref<Post[]>([]);
const isOwner = computed(() => {
  const user = useUser();
  if (!user.value?.id) return false;
  if (!props.userData?.id) return false;
  return user.value.id == props.userData.id;
});
const whatsappFailed = ref(false);

const meerInfo = () => {
  const { $router, $closeDetail } = useNuxtApp();
  $router.push({ name: 'gebruikers', query: { user: props.userData.id } });
  $closeDetail();
};
const emailUser = () =>
  (document.location.href = `mailto:${props.userData.email}`);
const phoneUser = () =>
  (document.location.href = `tel:${props.userData.phonenumber}`);

const whatsappUser = () => {
  try {
    const phonenumber = props.userData.phonenumber;
    const phoneInstance = phoneUtil.PhoneNumberUtil.getInstance();
    const number = phoneInstance.parseAndKeepRawInput(phonenumber, 'NL');

    const finalNumber =
      number.getCountryCode() + '' + number.getNationalNumber();
    const url = `https://wa.me/${finalNumber}`;
    window.open(url, '_blank').focus();
  } catch {
    console.error('Failed to open whatsapp');
    whatsappFailed.value = true;
  }
};

const logOut = async () => {
  const { $closeDetail } = useNuxtApp();
  try {
    await useAuth().signOut();
    $closeDetail();
  } catch (error) {
    console.error('catch', error);
  }
};

onMounted(async () => {
  if (!props.userData) return;
  userBlogs.value = await props.userData.getLastPosts();
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

  & .userName {
    font-size: var(--subtitle);
    margin-bottom: var(--spacing-300);
  }

  & .userData {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-200) var(--spacing-500);

    & .userDataLabel {
      font-weight: var(--thicc);
    }

    & .userDataValue {
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
