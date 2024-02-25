<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    needCollapsSign?: boolean
  }>(),
  { needCollapsSign: true }
)
const isColapsOpen = ref<boolean>(false)
</script>
<template>
  <div
    :class="{
      'collapse peer-checked:bg-red-500': true,
      'collapse-plus': needCollapsSign
    }"
  >
    <input type="checkbox" class="peer" />
    <summary class="collapse-title peer-checked:bg-gray-100">
      <slot name="title">
        <div>
          {{ title }}
        </div>
      </slot>
    </summary>
    <div class="collapse-content focus:py-3 focus:px-3.5">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<style lang="css">
input:checked + summary {
  background-color: red;
}
</style>
