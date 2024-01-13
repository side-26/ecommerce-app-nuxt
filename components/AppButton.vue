<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="`btn btn-${variant}`"
  >
    <slot v-if="!loading" />
    <span v-else class="loading loading-spinner"></span>
  </button>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'accent' | 'secondary' | 'accent' | 'link' | 'ghost'
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    loading: false,
    disabled: false,
    type: 'button'
  }
)
</script>
