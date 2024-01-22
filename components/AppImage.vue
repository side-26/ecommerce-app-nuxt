<script setup lang="ts">
import { Ref } from 'vue'

const props = defineProps<{
  src: string | undefined
  containerClass: string
}>()
const imgSrc: Ref<string> = computed(() => {
  if (props.src) return props.src
  return ''
})
const isLocalImg = computed(() => {
  if (props.src) return !!props?.src?.includes('assets')
  return false
})
</script>
<template>
  <figure :class="containerClass + ' overflow-hidden'">
    <img :src="imgSrc" loading="lazy" v-bind="$attrs" class="h-full w-full" />
    <!-- <nuxt-img
      v-else
      loading="lazy"
      :src="imgSrc"
      v-bind="$attrs"
      class="h-full w-full"
    /> -->
  </figure>
</template>
<style lang=""></style>
