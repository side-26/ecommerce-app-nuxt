// https://nuxt.com/docs/api/configuration/nuxt-config

import { PROXY_CONFIG } from "./configs/api.config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/image',
  ],
  nitro: {
    devProxy: PROXY_CONFIG
  }
})
