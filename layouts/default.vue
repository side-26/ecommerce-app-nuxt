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
    <header class="w-full sticky top-0 z-10 bg-white">
      <nav
        class="flex justify-between items-center px-5 md:px-10 py-2.5 text-lg"
      >
        <ul class="flex gap-10 items-center" v-if="isDesktop">
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
          v-if="isMobile"
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
        <ul class=" flex items-center text-lg">
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
          'overflow-hidden transition ease-in delay-200': true,
          'h-0': !isMenuOpen,
          'max-h-min': isMenuOpen
        }"
      >
        <li
          v-for="{ id, title, to } in appNavbar"
          :key="id"
          class="py-3 pr-4 border-gray-200 border-b-[1px]"
        >
          <nuxt-link :to="to" class="">{{ title }}</nuxt-link>
        </li>
      </ul>
    </header>
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <footer class="pt-5">
      <p class="flex justify-center gap-1 text-lg px-1 py-2 bg-slate-200">
        ساخته شده توسط
        <a href="https://github.com/side-26">side-26</a>
        با
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-primary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
          />
        </svg> 
        و 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 text-error"
        >
          <path
            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
          />
        </svg>
      </p>
    </footer>
  </section>
</template>
