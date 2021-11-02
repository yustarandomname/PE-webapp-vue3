import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  css: ["~/assets/css/styles.scss"],
  buildModules: ["@nuxtjs/pwa"],
});
