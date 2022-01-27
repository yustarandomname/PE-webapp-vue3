<template>
  <div class="avatar" :class="classes" @click="openDetail">
    <div>
      <div v-if="!hideName">
        {{ displayName }}
      </div>
      <slot></slot>
    </div>

    <img :alt="displayName + '\'s profielfoto'" :src="src" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { User } from '~~/models/user';

type AvatarSize = 'small' | 'medium' | 'large' | 'huge';
type AvatarAlign = 'left' | 'right' | 'top' | 'bottom';

const props = defineProps<{
  userId?: string | number;
  groupId?: string;
  size?: AvatarSize;
  align?: AvatarAlign;
  fullName?: boolean;
  hideName?: boolean;
  dontOpenDetail?: boolean;
}>();
defineEmits(['click']);

const src = ref(
  'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
);
const userData = ref<User>();
const displayName = computed(() => {
  if (userData.value)
    return props.fullName ? userData.value.fullName : userData.value.firstName;

  return '';
});

const openDetail = (event) => {
  if (props.dontOpenDetail) return;
  event.stopPropagation();

  const { $setDetail } = useNuxtApp();

  if (userData.value) $setDetail({ user: userData.value });
};

const loadUserData = async () => {
  if (!props.userId) return;
  const data = await User.getUserById(props.userId as string);
  userData.value = data;

  if (!data?.photoMetaData) return;
  const profileUrl = await data.getPhotoUrl();
  src.value = profileUrl ? profileUrl : src.value;
};

onMounted(() => {
  if (props.userId) loadUserData();
});

const classes = computed(() => {
  const classObject: { [key: string]: boolean } = {};
  classObject['size-' + props.size] = !!props.size;
  classObject['align-' + props.align] = !!props.align;
  classObject['hideName'] = !!props.hideName;
  return classObject;
});
</script>

<style scoped lang="scss">
.avatar {
  --avatar-size: 3rem;

  position: relative;
  display: flex;
  align-items: center;
  gap: 0 var(--spacing-200);
  width: fit-content;
  color: var(--grey-color-800);
  font-size: var(--small);
  cursor: pointer;

  & img {
    height: var(--avatar-size);
    width: var(--avatar-size);
    object-fit: cover;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid var(--grey-color-200);
  }

  // IMAGE SIZE
  &.size- {
    &huge > img {
      --avatar-size: 15rem;
    }

    &large > img {
      --avatar-size: 4rem;
    }

    &small {
      font-size: var(--small);
      --avatar-size: 2rem;
    }
  }

  // IMAGE ALIGN
  &.align- {
    &right {
      flex-direction: row-reverse;
    }

    &top {
      flex-direction: column;
    }

    &bottom {
      flex-direction: column-reverse;
    }
  }

  &.hideName {
    gap: 0;
  }
}
</style>
