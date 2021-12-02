import type { AxiosInstance } from 'axios';
import { User } from './models/user';
import type { Ref } from 'vue';

type UserOrError = Promise<
  | { error: Error; user?: undefined }
  | { user: UserInterface; error?: undefined }
>;

declare module '#app' {
  interface NuxtApp {
    $httpClient: AxiosInstance;
    $user: Ref<User>;
    $initUser: () => UserOrError;
    $signIn: (email: string, password: string) => UserOrError;
    $signOut: () => Promise<void>;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $httpClient: AxiosInstance;
    $user: Ref<User>;
    $initUser: () => UserOrError;
    $signIn: (email: string, password: string) => UserOrError;
    $signOut: () => Promise<void>;
  }
}

export {};
