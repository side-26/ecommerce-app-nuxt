<script setup lang="ts">
import { CURRENCY } from '~/configs/constants'
const props = withDefaults(
  defineProps<{
    needCurrency?: boolean
    price: number | string
    currencyClass?: string
  }>(),
  { needCurrency: true }
)
const formatedPrice: ComputedRef<string> = computed(() =>
  Number(props.price).toLocaleString('fa-IR')
)
</script>
<template>
  <div class="flex gap-1 items-center">
    <div>{{ formatedPrice }}</div>
    <div v-if="needCurrency" :class="currencyClass">
      {{ CURRENCY }}
    </div>
  </div>
</template>
