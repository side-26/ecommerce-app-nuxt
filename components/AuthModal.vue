<template>
  <client-only>
    <app-modal class="" v-model="isModalOpen">
      <template #title>
        <section class="flex justify-end">
          <app-button @click="closeModal" variant="ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </app-button>
        </section>
        <section class="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-24 h-24 text-secondary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </section>
      </template>
      <template #body>
        <lazy-auth-login-content
          v-if="authContent === 'login'"
          @toggle-auth-content="toggleAuthContent"
        />
        <lazy-auth-register-content
          v-if="authContent === 'register'"
          @toggle-auth-content="toggleAuthContent"
        />
        <lazy-auth-forgetpass-content
          v-if="authContent === 'forgetPass'"
          @toggle-auth-content="toggleAuthContent"
        />
      </template>
    </app-modal>
  </client-only>
</template>
<script setup lang="ts">
import { useAuthModal } from '~/composables/auth/useAuthModal'
import type { AuthContent } from '~/types/auth'
const { closeModal, isModalOpen } = useAuthModal()
const authContent = ref<AuthContent>('login')
const toggleAuthContent = (authCon: AuthContent = 'login') => {
  authContent.value = authCon
}
</script>
