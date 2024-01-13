<script setup lang="ts">
// @ts-ignore
import { useToast } from '~/composables/useToast'
// @ts-ignore
import { useAuthModal } from '~/composables/auth/useAuthModal'
import { appToastKey } from './configs/constants'
// @ts-ignore
import { useAuthStore } from '~/store/Auth.store'
const { isModalOpen, closeModal } = useAuthModal()
const { toastInfo } = useToast(appToastKey)
const authStore = useAuthStore()
// @ts-ignore
const { getIdentity } = useIdentity()
// @ts-ignore
watchEffect(() => {
  if (authStore.isLoggedIn) closeModal()
})
// @ts-ignore
onMounted(() => {
  getIdentity()
})
</script>
<template>
  <div dir="rtl">
    <NuxtLayout> </NuxtLayout>
    <lazy-the-app-toast v-if="toastInfo.showToast" />
    <lazy-auth-modal v-if="isModalOpen" />
  </div>
</template>
