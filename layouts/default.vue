<script setup lang="ts">
import { appNavbar } from '~/configs/constants'
const { isMobile, isDesktop, isWindows } = useDevice()
const isMenuOpen = ref<boolean>(false)
const toggleMenu = () => {
  isMenuOpen.value = !unref(isMenuOpen)
}
</script>

<template>
  <section class="flex flex-col flex-1 min-h-screen">
    <header class="relative">
      <nav
        class="flex justify-between items-center px-5 md:px-10 py-2.5 text-lg"
      >
        <ul class="flex gap-10 items-center" v-if="isWindows">
          <li
            v-for="{ id, title, to } in appNavbar"
            :key="id"
            class="text-slate-950 py-3 pr-4"
          >
            <NuxtLink :to="to" class="" :active-class="'text-primary'">{{
              title
            }}</NuxtLink>
          </li>
        </ul>
        <app-button
          @click="toggleMenu"
          class="p-0 border-0 bg-transparent text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8"
          >
            <path
              fill-rule="evenodd"
              d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </app-button>
        <ul class="flex items-center text-lg">
          <li class="lg:ml-4 px-3">
            <NuxtLink to="/auth" class="no-animation text-primary text-base">
              ورود \ ثبت نام</NuxtLink
            >
          </li>
          <li class="hidden md:block">
            <NuxtLink to="/">اکادمی لند</NuxtLink>
          </li>
        </ul>
      </nav>
      <ul
        :class="{
          'overflow-hidden transition ': true,
          'h-0': isMenuOpen,
          'h-auto': !isMenuOpen
        }"
      >
        <li
          v-for="{ id, title, to } in appNavbar"
          :key="id"
          class="py-3 pr-4 border-"
        >
          <nuxt-link :to="to" class="">{{ title }}</nuxt-link>
        </li>
      </ul>
    </header>
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <footer>footer</footer>
  </section>
</template>
