import type { AxiosInstance } from 'axios';
import type { Ref } from 'vue';
import { SupabaseClient, User } from '@supabase/supabase-js';
import useSupabase from './composables/useSupabase';

import { UserData } from './models/UserData';
import { GroupData } from './models/GroupData';

type UserOrGroup = { user?: UserData; group?: GroupData };

declare module '#app' {
  interface NuxtApp {
    $httpClient: AxiosInstance;

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
