<script setup lang="ts">
// @ts-ignore
import { useGetComments } from '~/composables/course/useComments'
const props = defineProps<{
  courseId: number | undefined
}>()
// @ts-ignore

const { data: commentsData, pending } = await useGetComments(props.courseId)
</script>
<template lang="">
  <lazy-course-comment-form :courseId="courseId" />
  <lazy-course-comments-list
    v-if="commentsData"
    :comments-list="commentsData"
  />
</template>
<style lang=""></style>
