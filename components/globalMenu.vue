<script setup lang="ts">
import { useLogout } from '~/composables/auth/useLogout'
import { ROUTES, appNavbar } from '~/configs/constants'
import { useAuthStore } from '~/store/Auth.store'
import { useCartStore } from '~/store/Cart.store'
import { onClickOutside } from '@vueuse/core'
const accountMenuRef = ref(null)
// @ts-ignore
const { isMobile, isDesktop, isWindows } = useDevice()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { logout } = useLogout()

const isMenuOpen = ref<boolean>(false)
const isAccountMenuOpen = ref<boolean>(false)
const toggleMenu = () => {
  isMenuOpen.value = !unref(isMenuOpen)
}
onClickOutside(accountMenuRef, event => {
  isAccountMenuOpen.value = false
})
</script>
<template lang="html">
  <header class="w-full bg-white relative">
    <nav class="flex justify-between items-center px-5 md:px-10 py-2.5 text-lg">
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
      <ul class="flex items-center text-lg">
        <client-only>
          <li class="lg:ml-4 px-3">
            <NuxtLink
              v-if="!authStore.isLoggedIn"
              :to="{ path: '/', query: { need_auth: 'true' } }"
              class="no-animation text-primary text-base"
            >
              ورود \ ثبت نام</NuxtLink
            >
            <template v-else>
              <app-button
                variant="ghost"
                @click.stop.prevent="isAccountMenuOpen = !isAccountMenuOpen"
                :class="{ 'opacity-0': !authStore.getFullName }"
              >
                {{ authStore.getFullName }}
              </app-button>
              <ul
                v-show="isAccountMenuOpen"
                ref="accountMenuRef"
                @click="isAccountMenuOpen = false"
                class="flex flex-col gap-1 absolute top-[72px] transition z-[100000] bg-white rounded-md overflow-hidden shadow-sm"
              >
                <li class="border-b-[1px] border-gray-200 p-3 cursor-pointer">
                  <nuxt-link :to="ROUTES.profile" class="text-center text-sm">
                    پروفایل
                  </nuxt-link>
                </li>
                <li class="border-b-[1px] border-gray-200 p-3 cursor-pointer">
                  <nuxt-link
                    :to="ROUTES.shoppingCart"
                    class="text-center text-sm flex items-center gap-2"
                  >
                    <div>سبد خرید</div>
                    <div
                      class="bg-primary py-1 px-3 text-xs text-white rounded-full"
                    >
                      {{ cartStore.getCartLength }}
                    </div>
                  </nuxt-link>
                </li>
                <li class="border-b-[1px] border-gray-200 p-3 cursor-pointer">
                  <nuxt-link
                    @click="logout"
                    class="text-center text-sm text-red-500"
                  >
                    خروج از حساب کاربری
                  </nuxt-link>
                </li>
              </ul>
            </template>
          </li>
        </client-only>
        <li class="hidden md:block">
          <nuxt-link to="/">اکادمی لند</nuxt-link>
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
</template>
<style lang="css" scoped>
.account_navbar {
  transform: scale(0);
}
.account_btn:hover + .account_navbar {
  transform: scale(1);
}
.account_navbar:hover {
  transform: scale(1);
}
</style>
