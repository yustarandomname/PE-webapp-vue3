import type { AxiosInstance } from 'axios';
import type { Ref } from 'vue';

declare module '#app' {
  interface NuxtApp {
    $httpClient: AxiosInstance;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $httpClient: AxiosInstance;
  }
}

export {};
