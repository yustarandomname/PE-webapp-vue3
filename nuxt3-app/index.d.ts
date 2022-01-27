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

    $userDetail: Ref<UserData>;
    $groupDetail: Ref<GroupData>;

    /**
     * Set detail data
     */
    $setDetail: (userOrGroup: UserOrGroup) => void;

    $closeDetail: () => void;
    $toggleDetail: (userOrGroup: UserOrGroup) => void;
    $goBackDetail: () => void;
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

    $userDetail: Ref<UserData>;
    $groupDetail: Ref<GroupData>;

    /**
     * Set detail data
     */
    $setDetail: (userOrGroup: UserOrGroup) => void;

    $closeDetail: () => void;
    $toggleDetail: (userOrGroup: UserOrGroup) => void;
    $goBackDetail: () => void;
  }
}

export {};
