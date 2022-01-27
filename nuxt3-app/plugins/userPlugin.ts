import { defineNuxtPlugin } from '#app';
import { User, UserInterface } from './../models/user';

const user = ref<User>(undefined);

const resetUser = () => {
  localStorage.removeItem('user');
  user.value = null;
};

const refreshUser = async () => {
  const { $httpClient } = useNuxtApp();

  // check if user is logged in on server
  try {
    const { data } = await $httpClient('/v1/auth/me');

    if (!data) {
      resetUser();
      return { error: Error('No response from server') };
    }

    localStorage.setItem('user', JSON.stringify(data as UserInterface));
    user.value = new User(data as UserInterface);

    return { user: data as UserInterface };
  } catch (error) {
    resetUser();
    return { error: new Error('Gebruiker is niet ingelogd') };
  }
};

// Init user
const initUser = async () => {
  // fetch user from localStorage
  const userString = localStorage.getItem('user');
  if (userString) {
    user.value = new User(JSON.parse(userString) as UserInterface);
  }

  return refreshUser();
};

const signIn = async (email: string, password: string) => {
  const { $httpClient } = useNuxtApp();

  await $httpClient('/sanctum/csrf-cookie');

  try {
    await $httpClient('/v1/auth/login', {
      method: 'POST',
      data: { email, password },
    });
  } catch (error) {
    return { error: Error('Verkeerde email of wachtwoord') };
  }

  return await refreshUser();
};

const signOut = () => {
  const { $httpClient } = useNuxtApp();

  return async () => {
    await $httpClient('/v1/auth/logout', {
      method: 'POST',
    });
    resetUser();
  };
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      user,
      initUser,
      signIn,
      signOut,
    },
  };
});
