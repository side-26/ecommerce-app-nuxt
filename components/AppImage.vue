<script setup lang="ts">

const props = defineProps<{
  src: string | undefined
  containerClass: string
}>()

</script>
<template>
  <figure :class="containerClass + ' overflow-hidden'">
    <img :src="src" loading="lazy" v-bind="$attrs" class="h-full w-full" />
  </figure>
</template>
<style lang=""></style>
