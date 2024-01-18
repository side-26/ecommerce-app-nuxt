<script setup lang="ts">
import { CourseComment } from '~/types/comments'
const courseComments: CourseComment = inject('course-comments')!
</script>
<template lang="">
  <section
    v-for="{
      id,
      comment,
      first_name,
      last_name,
      createdDate,
      children
    } in courseComments"
    :key="id"
  >
    <div
      class="prose-sm pt-3 lg:pt-4 space-y-3 lg:space-y-4 border-b-[1px] border-gray-200"
    >
      <div>
        <div>
          <div class="flex items-center gap-3">
            <div
              class="flex justify-center items-center bg-gray-500 rounded-full border-4 border-gray-300 w-12 h-12"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-full h-full text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <div>
              <h6 class="prose-xs font-medium">{{ first_name + last_name }}</h6>
              <span class="prose-2xs">{{ createdDate }}</span>
            </div>
          </div>
          <p class="font-medium my-3">
            {{ comment }}
          </p>
        </div>
      </div>
      <div
        v-if="children?.length > 0"
        v-for="{
          id,
          comment: answerComment,
          first_name,
          last_name
        } in children"
        :key="id"
        class="comments-answer-box"
      >
        <div class="hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </div>
        <p>
          {{ answerComment }}
        </p>
      </div>
    </div>
  </section>
</template>
<style lang=""></style>
