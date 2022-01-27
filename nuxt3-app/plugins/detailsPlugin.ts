import { defineNuxtPlugin } from '#app';
import { User } from '~~/models/user';

type UserOrGroup = { user?: User; group?: unknown };

const userData = ref<User>();
const groupData = ref<unknown>(); // TODO: fix interface for Groups
const history = ref<UserOrGroup[]>([]);

/**
 * Set detail data
 * @param {user?: UserData, group?: GroupData} userOrGroup
 */
const setDetail = ({ user, group }: UserOrGroup) => {
  if (user && group) return; // only one of user or group can be set

  userData.value = user;
  groupData.value = group;
  history.value.push({ user, group });
};

const closeDetail = () => setDetail({ user: null, group: null });

const toggleDetail = (userOrGroup: UserOrGroup) => {
  if (userData.value || groupData.value) {
    closeDetail();
  } else {
    setDetail(userOrGroup);
  }
};

const goBackDetail = () => {
  if (history.value.length <= 1) return closeDetail();

  const _current = history.value.pop();
  const last = history.value.pop() as UserOrGroup;
  setDetail(last);
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      userDetail: readonly(userData),
      groupDetail: readonly(groupData),
      setDetail,
      closeDetail,
      toggleDetail,
      goBackDetail,
    },
  };
});
