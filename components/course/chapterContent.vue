<script setup lang="ts">
import type { CourseChaperWithCounter } from '~/types/course'
const props = defineProps<{
  item: CourseChaperWithCounter
}>()
const firstItemId = computed(() => props?.item[0]?.courseVideos[0]?.id)
console.log(firstItemId)
</script>
<template lang="">
  <app-collaps
    v-for="{ chapterName, courseVideos, id } in item"
    :key="id"
    :title="chapterName"
  >
    <template #body>
      <course-chapter-item
        v-for="{ duration, hasFile, isDemo, videoTitle, id } in courseVideos"
        :key="id"
        :id="id"
        :duration="duration"
        :has-file="hasFile"
        :is-demo="isDemo"
        :video-title="videoTitle"
        :first-item-id="firstItemId"
      />
    </template>
  </app-collaps>
</template>
