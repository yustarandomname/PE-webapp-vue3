import { User as UserType } from "./../types/user";

interface UserState {
  user: UserType | null;
}

export const state = () => ({
  user: null as UserState["user"],
});

export const mutations = {
  set(state: UserState, user: UserType) {
    state.user = user;
  },

  signOut(state: UserState) {
    state.user = null;
  },
};
