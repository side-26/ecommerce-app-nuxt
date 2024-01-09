<template>
  <div
    v-if="toastInfo.showToast"
    @click="closeByClick()"
    class="toast toast-center cursor-pointer"
  >
    <div :class="`alert alert-${toastInfo.toastVariant}`">
      <span>{{toastInfo.toastMsg}}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useToast } from '~/composables/useToast';
import { appToastKey } from '~/configs/constants';
// const props=withDefaults(
//   defineProps<{variant:'primary'|'error'|'warning'|'info'}>(),{
//     variant:'primary'
//   }
// )
const {toastInfo,closeByClick}=useToast(appToastKey)
</script>
