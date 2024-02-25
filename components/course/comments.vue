<script setup lang="ts">
// @ts-ignore
import { useGetComments } from '~/composables/course/useComments'
import { useAuthStore } from '~/store/Auth.store'
const props = defineProps<{
  courseId: number | undefined
}>()
const router = useRouter()
const authStore = useAuthStore()
// @ts-ignore
const { data: commentsData, pending } = await useGetComments(props.courseId)
const goToLogin = () => {
  router.replace('/?need_auth=true')
}
</script>
<template lang="">
  <div v-if="!authStore.isLoggedIn" class="my-3">
    <div @click="goToLogin" role="button" class="alert alert-info text-sm">
      برای ثبت نظر ابتدا وارد شوید
    </div>
  </div>
  <lazy-course-comment-form v-if="authStore.isLoggedIn" :courseId="courseId" />
  <lazy-course-comments-list
    v-if="commentsData"
    :comments-list="commentsData"
  />
</template>
<style lang=""></style>
