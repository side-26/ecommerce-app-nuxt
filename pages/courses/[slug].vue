<script setup lang="ts">
import { courseDetailsNavbar } from '~/configs/constants'
import { useCourseDetails } from '~/composables/course/useCoursesDetails'
import { useGetComments } from '~/composables/course/useComments'
import { CourseDetails } from '~/types/course'
import { CourseComment } from '~/types/comments'
const route = useRoute()
const { data: courseDetails, pending: coursePending } = await useCourseDetails(
  route.params.slug as string
)
const { data: commentsData, pending } = await useGetComments(
  courseDetails as Ref<CourseDetails>
)
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
watchEffect(() => {
  if (commentsData) provide('course-comments', commentsData)
})
</script>
<template lang="">
  <div v-if="coursePending">درحال دریافت اطلاعات....</div>
  <section v-if="!coursePending">
    <div class="bg-[#220241] grid grid-cols-3 items-center">
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
    <ul class="lg:flex gap-2">
      <li
        v-for="{ id, title, to } in courseDetailsNavbar"
        :key="id"
        class="py-4 px-1.5 first:pr-3 last:pl-3"
      >
        <nuxt-link :to="{ hash: to }" class="text-sm transition">
          {{ title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
  <section
    v-if="!coursePending"
    class="lg:px-10 lg:pb-10 lg:pt-5 lg:grid lg:grid-cols-12 gap-4"
  >
    <article class="lg:col-span-8">
      <div class="course-details-box">
        <h6 id="about_course" class="text-secondary card-title">درباره دوره</h6>
        <p class="card-body">
          {{ courseDetails?.description }}
        </p>
      </div>
      <div class="course-details-box">
        <h6 id="prerequisite_courses" class="text-secondary card-title">
          پیش نیازهای دوره
        </h6>
        <p class="card-body">
          {{ courseDetails?.requirements }}
        </p>
      </div>
      <div
        v-if="courseDetails?.courseChapters?.length"
        class="course-details-box"
      >
        <div class="flex justify-between items-center">
          <div>
            <h6 id="courses_list" class="text-secondary card-title mb-3">
              لیست ویدیو های دوره
            </h6>
            <span class="text-gray-400 text-xs"
              >توجه! تمامی ویدئوهای دوره با vlc media player تست و بازبینی شده
              اند.</span
            >
          </div>
          <div>
            <app-button variant="ghost" class="btn-sm text-link">
              لیست ویدیو های رایگان
            </app-button>
          </div>
        </div>
        <section>
          <courses-chapter-item :item="courseDetails?.courseChapters" />
        </section>
      </div>
      <div class="course-details-box">
        <h6 id="َّFAQ" class="text-secondary card-title mb-3">
          پرسش های متداول
        </h6>
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
      <client-only>
        <div class="course-details-box">
          <h6 id="comments" class="text-secondary card-title">نظرات کاربران</h6>
          <section>
            <lazy-courses-comments
              v-if="courseDetails?.id"
              :course-id="courseDetails?.id"
            />
          </section>
        </div>
      </client-only>
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
        </section>
      </client-only>
      <section class="p-4 bg-white rounded-box border-[1px] border-gray-200">
        <div class="flex gap-3 items-center">
          <app-image :src="randomImg" class="rounded-full w-20 h-20" />
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
<style lang="css"></style>
