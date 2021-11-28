import { AxiosInstance } from 'axios';
import { ComputedRef, Ref } from 'vue';
import { User } from './user';

export interface Route {
  fullPath: string;
  hash: string;
  href: string;
  matched: any[];
  meta: any;
  name: string;
  params: any;
  path: string;
  query: { [key: string]: string };
  redirectedFrom?: string;
}

export interface Router {
  back: () => void;
  go: (delta: number) => void;
  replace: (to: string) => void;
  push: (to: string) => void;

  currentRoute: Route;
}

export interface NuxtApp {
  globalName: string;
  isHydrating: boolean;
  provide: (name: string, value: any) => void;

  // Standard provided properties
  $router: Router;
  $config: any;

  // Custom provided properties
  $authenticated: ComputedRef<boolean>;
  $user: Ref<User>;
  $httpClient: AxiosInstance;
  $signIn: (email: string, password: string) => Promise<User>;
  $signOut: () => Promise<void>;
}
