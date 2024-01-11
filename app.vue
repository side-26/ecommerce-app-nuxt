<script setup lang="ts">
// @ts-ignore
import { useAuthModal } from '~/composables/auth/useAuthModal'
const { isModalOpen, openModal } = useAuthModal()
</script>
<template>
  <div dir="rtl">
    <app-button @click="openModal"> open modal </app-button>
    <NuxtLayout> </NuxtLayout>
    <lazy-the-app-toast />
    <lazy-auth-modal v-if="isModalOpen" />
  </div>
</template>
