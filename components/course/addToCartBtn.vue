<script setup lang="ts">
import { useAddToCart } from '~/composables/cart/useAddToCart'
import { useDeleteFromCart } from '~/composables/cart/useDeleteFormCart'
import { useCartStore } from '~/store/Cart.store'
const props = defineProps<{
  courseId: number
}>()
const cartStore = useCartStore()
const { adding, addToCart } = useAddToCart(props.courseId)
const { deleting, deleteFromCart } = useDeleteFromCart(props.courseId)
</script>
<template>
  <client-only>
    <template v-if="cartStore.fetchedOnce">
      <app-button
        v-if="cartStore.isIdExisted(courseId)"
        @click.stop.prevent="() => deleteFromCart(courseId)"
        :loading="deleting"
        :disabled="deleting"
        variant="secondary"
        class="text-white btn-sm font-light prose-base order-2 lg:order-1 mt-4 lg:mt-0"
      >
        حذف از سبد خرید
      </app-button>
      <app-button
        v-else
        @click.stop.prevent="() => addToCart(courseId)"
        :loading="adding"
        :disabled="adding"
        variant="primary"
        class="text-white btn-sm font-light prose-base order-2 lg:order-1 mt-4 lg:mt-0"
      >
        اضافه به سبد خرید
      </app-button>
    </template>
  </client-only>
</template>
