<script setup lang="ts">
import { Form } from 'vee-validate'
import { useCreateComment } from '~/composables/course/useComments'
import { commentSchema } from '~/configs/form.validation'
import { CommentBody } from '~/types/comments'
const props = defineProps<{
  courseId: number | undefined
}>()
const { createComment, sumbitting } = useCreateComment()
const onSubmit = (values: CommentBody, actions) => {
  values.course_id = props.courseId!
  createComment(values, actions)
}
</script>
<template lang="">
  <Form @submit="onSubmit" :validation-schema="commentSchema">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <app-text-input
          name="first_name"
          placeholder="نام خود را وارد کنید..."
          class=""
        />
      </div>
      <div>
        <app-text-input
          name="last_name"
          placeholder="نام خانوادگی خود را وارد کنید..."
          class=""
        />
      </div>
    </div>
    <app-text-input
      name="comment"
      placeholder="نظرات ارزشمند خودتان را با آکادمی لند در میان بگذارید..."
      is-textarea
      class="textarea-lg w-full p-0 text-sm [&_textarea]:p-4"
    />
    <app-button
      type="submit"
      variant="secondary"
      :loading="sumbitting"
      :disabled="sumbitting"
      class="text-white w-full"
    >
      ثبت نظر
    </app-button>
  </Form>
  <courses-comments-list />
</template>
<style lang=""></style>
