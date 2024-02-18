<script setup lang="ts">
import { useCourseService } from '~/composables/course/useCourse.service'
import { ROUTES } from '~/configs/constants'
const { getCourseList } = useCourseService()
const { data, pending } = await useAppAsyncData(
  'course-list',
  () => getCourseList(),
  { server: false }
)
useHead({
  title: 'به اکادمی لند خوش آمدید',
  meta: [
    {
      name: 'description',
      content: 'یک متن تستی برای سئو سایت است.'
    }
  ]
})
</script>
<template lang="">
  <!-- intro content -->
  <section>
    <div class="homeIntroBg relative text-white">
      <div
        class="absolute bg-opacity-70 w-full h-full left-0 top-0 bg-black"
      ></div>
      <div
        class="relative z-10 px-11 pt-11 pb-10 lg:pb-32 flex text-right xl:w-1/2 leading-10 mx-auto"
      >
        <div class="text-lg">
          <h1 class="text-xl md:text-2xl mb-5 md:w-3/4 tracking-normal">
            آموزش تخصصی vue js و nuxt js
          </h1>
          <p class="my-7 leading-7 text-base md:text-lg">
            به دنیای برنامه نویسی آکادمی لند خوش آمدی، آموزش پروژه محور برنامه
            نویسی با طعم تجربه!
          </p>
          <AppButton
            variant="accent"
            class="px-12 hover:bg-white text-black btn-wide font-thin"
          >
            شروع یادگیری
          </AppButton>
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap gap-5 lg:-translate-y-1/2 justify-center items-center m-4 lg:my-0"
    >
      <div
        v-for="(item, index) in 3"
        :key="index"
        class="bg-white shadow-sm p-5 rounded-xl flex items-center gap-2 lg:max-w-[22rem] border-gray-200 lg:border-none border-[1px]"
      >
        <div class="text-secondary mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="lg:w-10 lg:h-10 w-12 h-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
            />
          </svg>
        </div>
        <div class="text-sm lg:text-base">
          <h4 class="">تجربه عملی مدرس</h4>
          <p class="mt-[9px]">
            سال ها تجربه برنامه نویسی در قالب دوره های آموزشی منتظر شماست
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- coureses content -->
  <section class="lg:mx-10">
    <div class="head text-center">
      <h3>دوره های آکادمی لند</h3>
    </div>
    <lazy-app-slider v-if="data" :items="data">
      <template #item="{ item }">
        <course-card
          :key="item.id"
          :to="ROUTES.courses + '/' + item?.slug"
          class="relative lg:max-w-[27rem] w-[25.1rem] overflow-hidden"
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
            <div class="p-5 flex flex-col lg:flex-row justify-between bg-white">
              <course-add-to-cart-btn :course-id="item?.id" />
              <div class="flex items-center gap-5 order-1 lg:order-2">
                <AppPriceNumber
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
      </template>
    </lazy-app-slider>
  </section>
</template>

<style lang="css">
.homeIntroBg {
  background-image: url('~/assets/img/images/home-header-background.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-origin: initial;
}
</style>
