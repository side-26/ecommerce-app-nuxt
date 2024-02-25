<template>
  <section
    class="fixed bottom-0 left-1/2 right-1/2 translate-x-1/2 flex flex-col gap-2 w-max py-4"
  >
    <div
      v-for="{ id, toastMsg, toastVariant } in toastsList"
      :key="id"
      @click="deleteToast(id)"
      :class="`cursor-pointer toast-${toastVariant}`"
    >
      <div :class="`alert alert-${toastVariant}`">
        <span>{{ toastMsg }}</span>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useToast } from '~/composables/useToast'
const { addNewToast, toastsList, deleteToast } = useToast()
</script>
