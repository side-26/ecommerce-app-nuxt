<script setup lang="ts">
import type { CourseChaperWithCounter } from '~/types/course'

const props = defineProps<{
  item: CourseChaperWithCounter[]
}>()
const getChapterCounter = <T>(index: number) => {
  const firsindex = props.item[0].courseVideos[0].id
  return index - firsindex + 1
}
</script>
<template lang="">
  <app-collaps
    v-for="{ chapterName, courseVideos, id } in item"
    :key="id"
    :title="chapterName"
  >
    <template #body>
      <section
        v-for="{
          id: courseId,
          duration,
          hasFile,
          isDemo,
          videoTitle
        } in courseVideos"
        :key="courseId"
        class="flex flex-col space-y-1.5 sm:space-y-0 sm:flex-row sm:justify-between py-3"
      >
        <div class="flex items-center gap-2">
          <div
            class="t-center flex-shrink-0 w-7 h-7 text-xs rounded-full bg-gray-600 text-white"
          >
            {{ getChapterCounter(courseId) }}
          </div>
          <div>
            {{ videoTitle }}
          </div>
        </div>
        <div v-if="hasFile" class="flex items-center gap-2">
          <div class="text-gray-500 prose-sm">
            {{ duration }}
          </div>
          <div>
            <svg
              v-if="isDemo"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-primary"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
        </div>
        <div v-else>در حال ضبط...</div>
      </section>
    </template>
  </app-collaps>
</template>