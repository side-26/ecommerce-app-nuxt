<script setup lang="ts">
// @ts-ignore
import { useToast } from '~/composables/useToast'
// @ts-ignore
import { useAuthModal } from '~/composables/auth/useAuthModal'
// @ts-ignore
import { useAuthStore } from '~/store/Auth.store'
// @ts-ignore

import { useCartStore } from '~/store/Cart.store'
const { isModalOpen, closeModal } = useAuthModal()
const { addNewToast, toastsList } = useToast()
const cartStore = useCartStore()

const authStore = useAuthStore()
// @ts-ignore
watchEffect(() => {
  if (authStore.isLoggedIn) closeModal()
})
// @ts-ignore
const { getIdentity } = useIdentity()
// @ts-ignore
onMounted(() => {
  getIdentity()
})
// @ts-ignore
useHead({
  titleTemplate: newTitle => {
    return newTitle ? `${newTitle} - اکادمی لند` : 'اکادمی لند'
  }
})
</script>
<template>
  <div dir="rtl">
    <NuxtLayout> </NuxtLayout>
    <lazy-the-app-toast v-if="toastsList?.length > 0" />
    <lazy-auth-modal v-if="isModalOpen" />
  </div>
</template>
