import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  build: {
    transpile: ['@popperjs'],
  },
  css: ['~/assets/css/styles.scss'],
  meta: {
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined',
        rel: 'stylesheet',
      },
    ],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['ion-icon'].includes(tag),
    },
  },
});
