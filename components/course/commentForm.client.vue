<script setup lang="ts">
import { Form } from 'vee-validate'
import { useCreateComment } from '~/composables/course/useComments'
import type { CommentBody } from '~/types/comments'
import { useAuthStore } from '~/store/Auth.store'
const props = defineProps<{
  courseId: number
}>()
const { sumbitting, onSubmit, hasFullName, commentSchema } = useCreateComment(
  toRef(props, 'courseId')!
)
</script>
<template lang="">
  
  <Form @submit="onSubmit" :validation-schema="commentSchema">
    <div v-if="!hasFullName" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
</template>
