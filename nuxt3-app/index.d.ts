import type { AxiosInstance } from 'axios';
import { User, UserInterface } from './models/user';
import type { Ref } from 'vue';
import { Message } from './models/confirmMessage';

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

    $confirmMessages: Ref<Message[]>;
    $addConfirmMessage: (message: Message) => void;
    $removeConfirmMessage: (message: Message) => void;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $httpClient: AxiosInstance;

    $user: Ref<User>;
    $initUser: () => UserOrError;
    $signIn: (email: string, password: string) => UserOrError;
    $signOut: () => Promise<void>;

    $confirmMessages: Ref<Message[]>;
    $addConfirmMessage: (message: Message) => void;
    $removeConfirmMessage: (message: Message) => void;
  }
}

export {};
