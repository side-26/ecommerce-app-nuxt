<script setup lang="ts">
const props=defineProps<{to:string}>()
</script>
<template>
  <NuxtLink :to="to" class="border-[2.5px] border-gray-100 rounded-2xl overflow-hidden block">
    <div class="">
      <slot name="header"></slot>
    </div>
    <div>
      <slot name="body"></slot>
    </div>
    <div class="">
      <slot name="actions"></slot>
    </div>
  </NuxtLink>
</template>
