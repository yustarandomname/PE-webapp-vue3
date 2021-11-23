import type { user } from './../types/user';
import type { Ref } from 'vue';
import type { NuxtApp } from '#app';
import axios from 'axios';

const createClient = () =>
  axios.create({
    // baseURL: process.env.VUE_APP_ROOT_API,
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const refreshUser = async (
  nuxtApp: NuxtApp
): Promise<{
  user?: user;
  error?: Error;
}> => {
  const { $user, $authenticated, $httpClient } = nuxtApp;
  const userString = window.localStorage.getItem('user');

  // Set local user to be equal to the user in local storage
  if (userString) {
    $user.value = JSON.parse(userString);
    $authenticated.value = true;
  }

  try {
    // Check with server if user is truly logged in
    const res = await $httpClient('/v1/auth/me');

    if (!res) return { error: Error('No response from server') };

    window.localStorage.setItem('user', JSON.stringify(res.data));

    $user.value = res.data as user;
    $authenticated.value = true;

    return { user: res.data };
  } catch (error) {
    return { error: new Error('Gebruiker is niet ingelogd') };
  }
};

const createSignIn = (
  nuxtApp: NuxtApp,
  loginError: Ref<string | undefined>
) => {
  return async (email: string, password: string) => {
    await nuxtApp.$httpClient('/sanctum/csrf-cookie');

    try {
      await nuxtApp.$httpClient('/v1/auth/login', {
        method: 'POST',
        data: { email, password },
      });
    } catch (error) {
      loginError.value = 'Verkeerde email of wachtwoord';
      return;
    }

    const refreshResponse = await refreshUser(nuxtApp);
    loginError.value = refreshResponse.error?.message;
  };
};

const createSignOut = (nuxtApp: NuxtApp) => {
  return async () => {
    await nuxtApp.$httpClient('/v1/auth/logout', {
      method: 'POST',
    });
    window.localStorage.removeItem('user');
    nuxtApp.$user.value = null;
    nuxtApp.$authenticated.value = false;
  };
};

// Make authenticaiton global variables within nuxt app
// @param nuxtApp: NuxtApp
// @param loginError: Ref<string | undefined>
export const setupAuth = (
  nuxtApp: NuxtApp,
  loginError: Ref<string | undefined>
) => {
  if (!nuxtApp.$httpClient) nuxtApp.provide('httpClient', createClient());

  if (!nuxtApp.$user) nuxtApp.provide('user', ref<null | user>(null));

  if (!nuxtApp.$authenticated)
    nuxtApp.provide('authenticated', ref<boolean>(false));

  if (!nuxtApp.$signIn)
    nuxtApp.provide('signIn', createSignIn(nuxtApp, loginError));

  if (!nuxtApp.$signOut) nuxtApp.provide('signOut', createSignOut(nuxtApp));
};
