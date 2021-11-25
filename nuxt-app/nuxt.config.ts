import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  css: ["~/assets/css/styles.scss"],
  meta: {
    script: [
      {
        src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
        type: "module",
      },
      {
        src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js",
        nomodule: true,
      },
    ],
    link: [
      {
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        rel: "stylesheet",
      },
    ],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ["ion-icon"].includes(tag),
    },
  },
});
