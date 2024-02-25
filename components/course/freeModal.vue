<script setup lang="ts">
import type { CourseChapter } from '~/types/course'
const props = defineProps<{
  courseVideosChapters: CourseChapter[]
}>()

const { isModalOpen, toggleFreeCourseModal } = inject(
  '--open-free-modal--',
  false
)
console.log(isModalOpen)
const firstItemId = computed(
  () => props.courseVideosChapters[0]?.courseVideos[0]?.id
)
</script>
<template lang="html">
  <lazy-app-modal v-if="isModalOpen" v-model="isModalOpen">
    <template #title>
      <section class="flex justify-between items-center">
        <div class="font-medium">ویدئوهای رایگان دوره</div>
        <app-button
          variant="ghost"
          @click="toggleFreeCourseModal"
          class="btn-sm p-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </app-button>
      </section>
    </template>
    <template #body>
      <section>
        <div v-for="{ id, courseVideos } in courseVideosChapters" :key="id">
          <template
            v-for="{
              id: chapterId,
              duration,
              hasFile,
              isDemo,
              videoTitle
            } in courseVideos"
          >
            <course-chapter-item
              v-if="!!isDemo == true"
              :key="chapterId"
              :id="chapterId"
              :duration="duration"
              :hasFile="hasFile"
              :isDemo="isDemo"
              :videoTitle="videoTitle"
              :first-item-id="firstItemId"
            />
          </template>
        </div>
      </section>
    </template>
  </lazy-app-modal>
</template>
<style lang=""></style>
