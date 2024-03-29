import { BASE_URL } from "./configs/api.config";
// https://nuxt.com/docs/api/configuration/nuxt-config

import { PROXY_CONFIG } from "./configs/api.config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/image", "@nuxtjs/device", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  nitro: {
    devProxy: PROXY_CONFIG,
  },
});
