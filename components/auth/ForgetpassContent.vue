<script setup lang="ts">
// @ts-ignore
import type { AuthContent } from '~/types/auth'
const emit = defineEmits<{
  (e: 'toggleAuthContent', authCon: AuthContent): void
}>()
</script>
<template>
  <form>
    <section>
      <div>
        <app-text-input
          name="email"
          type="email"
          label="ایمیل"
          placeholder="ایمیل خود را وارد کنید...."
          class="w-full"
        />
      </div>
    </section>
    <section class="flex flex-col gap-1 mt-4">
      <app-button class="w-full btn-secondary text-white">
        ارسال ایمیل بازنشانی</app-button
      >
      <div class="flex justify-center py-2.5 bg-gray-100 mt-4">
        <app-button
          variant="link"
          @click="$emit('toggleAuthContent', 'register')"
          class="text-blue-500 btn-sm"
        >
          ورود به حساب کاربری</app-button
        >
      </div>
    </section>
  </form>
</template>
