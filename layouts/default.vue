<script setup lang="ts">
import {appNavbar} from '~/configs/constants'
</script>

<template>
  <section class="flex flex-col flex-1 min-h-screen">
    <header>
      <nav class="flex justify-between items-center  px-10 py-2.5 text-lg">
        <ul class="flex gap-10 items-center">
          <li
            v-for="{id,title,to} in appNavbar"
            :key="id"
            class="text-slate-950 py-3 pr-4"
          >
            <NuxtLink
              :to="to"
              class=""
              :active-class="'text-primary'"
              >{{title}}</NuxtLink
            >
          </li>
        </ul>
        <ul class="flex items-center text-lg">
          <li class="lg:ml-4 px-3">
            <NuxtLink to="/auth" class="no-animation text-primary text-base"> ورود \ ثبت نام</NuxtLink>
          </li>
         <li><NuxtLink to="/">اکادمی لند</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <footer>footer</footer>
  </section>
</template>
