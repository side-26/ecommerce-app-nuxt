<script setup lang="ts">
// @ts-ignore
import { useCourse } from '~/composables/course/useCourse'
// @ts-ignore

import { ROUTES } from '~/configs/constants'
// @ts-ignore

const { data, pending } = await useCourse()
//@ts-ignore
useHead({
  title: 'دوره های سایت اکادمی لند'
})
</script>
<template lang="html">
  <div
    v-if="pending"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 md:p-10 lg:p-20"
  >
    <course-card
      v-for="(item, index) in 6"
      :key="index"
      to=""
      class="relative cols overflow-hidden shadow-md"
    >
      <template #header>
        <div class="w-full h-48">
          <skeleton-text class="w-full h-full" />
        </div>
        <div
          class="absolute top-2 left-0 rounded-r-full font-bold text-white px-2 py-1 text-sm z-10"
        >
          <skeleton-text class="w-5" />
        </div>
      </template>
      <template #body>
        <div class="bg-accent p-5 space-y-2">
          <h3 class="pb-4 line-clamp-2 hover:text-primary transition">
            <skeleton-text class="w-full h-10" />
          </h3>
          <skeleton-text class="w-4/6 h-5" />
          <skeleton-text class="w-4/5 h-5" />
          <skeleton-text class="w-4/6 h-5" />
        </div>
      </template>
      <template #actions>
        <div class="p-5 flex flex-wrap justify-between bg-white">
          <skeleton-text class="w-5" />
          <skeleton-text class="w-5" />
        </div>
      </template>
    </course-card>
  </div>
  <section class="p-5 md:p-10 lg:p-20">
    <div
      v-if="!pending && data"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <course-card
        v-for="item in data"
        :key="item.id"
        :to="ROUTES.courses + '/' + item?.slug"
        class="relative cols overflow-hidden shadow-md"
      >
        <template #header>
          <div class="aspect-w-40 aspect-h-21">
            <div
              class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-5"
            ></div>
            <NuxtImg :src="item?.src" class="h-full w-full" />
          </div>
          <div
            v-if="item?.percent"
            class="absolute top-2 left-0 bg-secondary rounded-r-full font-bold text-white px-2 py-1 text-sm z-10"
          >
            {{ item?.percent }} %
          </div>
        </template>
        <template #body>
          <div class="bg-accent p-5">
            <h3 class="pb-4 line-clamp-2 hover:text-primary transition">
              {{ item?.title }}
            </h3>
            <p class="line-clamp-4 min-h-[6rem] prose-sm">
              {{ item?.short_description }}
            </p>
          </div>
        </template>
        <template #actions>
          <div class="p-5 flex flex-wrap justify-between bg-white">
            <div class="text-secondary text-xs">
              {{ item.statusText }}
            </div>
            <div class="flex items-center gap-5 order-1 lg:order-2">
              <AppPriceNumber
                v-if="item?.percent > 0"
                :price="item?.amount"
                class="line-through prose-sm"
              />
              <AppPriceNumber
                :price="item?.amountOff"
                :needCurrency="true"
                class="prose-sm"
                currencyClass="prose-xs"
              />
            </div>
          </div>
        </template>
      </course-card>
    </div>
  </section>
</template>
