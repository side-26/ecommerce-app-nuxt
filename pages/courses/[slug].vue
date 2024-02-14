<script setup lang="ts">
import { courseDetailsNavbar } from '~/configs/constants'
import {
  useCourseDetails,
  useCanBuyProvider
} from '~/composables/course/usecourseDetails'
import type { CourseDetails } from '~/types/course'
import my_pic from '~/assets/img/my_pic.jpg'
import { useAuthStore } from '~/store/Auth.store'
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isFreeCourseModalOpen = ref<boolean>()
const {
  data: courseDetails,
  pending: coursePending,
  currentPosition
  // @ts-ignore
} = await useCourseDetails(route.params.slug as string)
const courseId = computed(() => courseDetails?.value?.id)
useCanBuyProvider(courseId)
const videoCount = computed(() => {
  let count = 0
  if (courseDetails.value) {
    courseDetails?.value?.courseChapters.map(videos => {
      count += videos.courseVideos?.length
      courseDetails?.value?.courseChapters
    })
    return count
  }
  return 'درحال محاسبه...'
})
const totalCourseTime = computed(() => {
  if (courseDetails?.value) {
    const { hours, minutes, seconds } = courseDetails?.value?.courseDuration
    return hours > 0 || minutes > 0 || seconds > 0
      ? `${hours} : ${minutes} : ${seconds}`
      : 'در حال ضبط'
  }
  return 'درحال محاسبه...'
})
const toggleFreeCourseModal = () => {
  isFreeCourseModalOpen.value = !unref(isFreeCourseModalOpen)
}
provide('--open-free-modal--', {
  isModalOpen: isFreeCourseModalOpen,
  toggleFreeCourseModal
})
const goToLogin = () => {
  router.replace('/?need_auth=true')
}
</script>
<template lang="">
  <div v-if="coursePending">درحال دریافت اطلاعات....</div>
  <template v-if="!coursePending && courseDetails">
    <section class="py-4 lg:py-0">
      <div class="bg-[#220241] lg:grid grid-cols-3 items-center py-4 lg:py-0">
        <app-image
          :src="courseDetails?.src"
          container-class=" drop-shadow-lg filter blur-[4px]"
        />
        <div class="flex flex-col items-center gap-4">
          <h2 class="font-bold prose-2xl text-white">
            {{ courseDetails?.title }}
          </h2>
          <div class="badge badge-secondary badge-lg text-xs">
            {{ courseDetails?.statusText }}
          </div>
        </div>
      </div>
    </section>
    <nav class="bg-white sticky top-0 z-10">
      <ul class="container x mandatory-scroll-snapping lg:flex gap-2">
        <li
          v-for="{ id, title, to, elementId } in courseDetailsNavbar"
          :key="id"
          class="py-4 px-1.5 first:pr-3 last:pl-3"
        >
          <nuxt-link
            :to="{ hash: to }"
            :class="{
              'text-sm transition': true,
              'text-primary': elementId === currentPosition
            }"
          >
            {{ title }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <section class="lg:px-10 lg:pb-10 lg:pt-5 lg:grid lg:grid-cols-12 gap-4">
      <article class="lg:col-span-8">
        <div v-if="courseDetails" id="about_course" class="course-details-box">
          <h6 class="text-secondary card-title">درباره دوره</h6>
          <p class="card-body">
            {{ courseDetails?.description }}
          </p>
        </div>
        <div
          v-if="courseDetails"
          id="prerequisite_course"
          class="course-details-box"
        >
          <h6 class="text-secondary card-title">پیش نیازهای دوره</h6>
          <p v-html="courseDetails?.requirements" class="card-body"></p>
        </div>
        <div
          v-if="courseDetails?.courseChapters?.length"
          id="course_list"
          class="course-details-box"
        >
          <div class="flex justify-between items-center">
            <div>
              <div class="flex justify-between items-center">
                <h6 class="text-secondary card-title mb-3">
                  لیست ویدیو های دوره
                </h6>
                <div class="lg:hidden block">
                  <app-button
                    variant="ghost"
                    @click="toggleFreeCourseModal"
                    class="btn-sm text-link text-xs lg:text-base"
                  >
                    لیست ویدیو های رایگان
                  </app-button>
                </div>
              </div>
              <span class="text-gray-400 text-xs"
                >توجه! تمامی ویدئوهای دوره با vlc media player تست و بازبینی شده
                اند.</span
              >
            </div>
            <div class="hidden lg:block">
              <app-button
                variant="ghost"
                @click="toggleFreeCourseModal"
                class="btn-sm text-link text-xs lg:text-base"
              >
                لیست ویدیو های رایگان
              </app-button>
            </div>
          </div>
          <section>
            <course-chapter-content :item="courseDetails?.courseChapters" />
          </section>
        </div>
        <div class="course-details-box" id="popular_questions">
          <h6 class="text-secondary card-title mb-3">پرسش های متداول</h6>
          <div>
            <app-collaps
              v-for="{ answer, id, question } in courseDetails?.courseQuestions"
              :key="id"
              :title="question"
            >
              <template #body>
                <div>{{ answer }}</div>
              </template>
            </app-collaps>
          </div>
        </div>
        <div v-if="courseId" class="course-details-box" id="comments">
          <client-only>
            <h6 class="text-secondary card-title">نظرات کاربران</h6>
            <section>
              <lazy-course-comments v-if="courseId" :course-id="courseId" />
            </section>
          </client-only>
        </div>
      </article>
      <aside class="lg:col-span-4 space-y-3">
        <client-only>
          <section
            class="p-4 bg-white rounded-box border-[1px] border-gray-200 text-sm"
          >
            <div class="flex justify-between items-center p-3">
              <div>قیمت دوره</div>
              <app-price-number :price="courseDetails?.amountOff" />
            </div>
            <div class="flex justify-between items-center p-3">
              <div>مدت زمان دوره</div>
              <div>{{ totalCourseTime }}</div>
            </div>
            <div class="flex justify-between items-center p-3">
              <div>تعداد قسمت ها</div>
              <div>{{ videoCount }}</div>
            </div>
            <div class="flex justify-between items-center p-3">
              <div>تعداد شرکت کنندگان</div>
              <div>{{ courseDetails?.userCounter || 0 }}</div>
            </div>
            <app-button
              v-if="!authStore.isLoggedIn"
              @click="goToLogin"
              variant="secondary"
              class="w-full"
            >
              ورود / ثبت نام
            </app-button>
            <course-buy-button v-else :courseId="courseId" />
          </section>
        </client-only>
        <section class="p-4 bg-white rounded-box border-[1px] border-gray-200">
          <div class="flex gap-3 items-center">
            <app-image :src="my_pic" container-class="rounded-full w-20 h-20" />
            <div class="space-y-2">
              <div class="font-semibold">مدرس دوره</div>
              <h5>مهدی رشیدی</h5>
            </div>
          </div>
          <q>این یک متن و نقل قول تستی است.</q>
        </section>
      </aside>
    </section>
  </template>
  <client-only>
    <lazy-course-free-modal
      v-if="isFreeCourseModalOpen"
      :courseVideosChapters="courseDetails?.courseChapters"
    />
  </client-only>
</template>
<style lang="css" scoped>
.container {
  display: flex;
  flex: none;
  overflow: auto;
}
.container.x {
  width: 100%;
  flex-flow: row nowrap;
  overflow-y: hidden;
}
.x.mandatory-scroll-snapping {
  scroll-snap-type: x mandatory;
}
.container > li {
  text-align: center;
  scroll-snap-align: center;
  flex: none;
}
</style>
