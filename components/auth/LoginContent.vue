<script setup lang="ts">
import { Form } from 'vee-validate'
import { loginSchema } from '~/configs/form.validation'
// @ts-ignore
import type { AuthContent } from '~/types/auth'
const emit = defineEmits<{
  (e: 'toggleAuthContent', authCon: AuthContent): void
}>()
import { useLogin } from '~/composables/auth/login/useLogin'
import { LoginValues } from '~/types/auth/login'
const { login, submitting } = useLogin()
const onSubmit = (values: LoginValues) => {
  login(values)
}
</script>
<template>
  <Form :validation-schema="loginSchema" @submit="onSubmit">
    <section>
      <div>
        <app-text-input
          name="username"
          type="text"
          label="نام کاربری"
          placeholder="شماره موبایل یا ایمیل را وارد کنید..."
          class="w-full"
        />
        <app-text-input
          name="password"
          type="password"
          label="پسورد"
          placeholder="پسورد خود را وارد کنید..."
          class="w-full"
        />
      </div>
    </section>
    <section class="flex flex-col gap-1 mt-4">
      <div class="flex justify-end">
        <app-button
          variant="link"
          @click="$emit('toggleAuthContent', 'forgetPass')"
          class="text-gray-500 btn-sm"
        >
          کلمه عبور خود را فراموش کرده ام
        </app-button>
      </div>
      <app-button
        type="submit"
        :disabled="submitting"
        :loading="submitting"
        class="w-full btn-secondary text-white"
      >
        ورود</app-button
      >
      <div class="flex justify-center py-2.5 bg-gray-100 mt-4">
        <app-button
          @click="$emit('toggleAuthContent', 'register')"
          class="text-blue-500 btn-sm"
          variant="link"
        >
          ثبت نام می کنم</app-button
        >
      </div>
    </section>
  </Form>
</template>
