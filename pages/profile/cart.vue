<script setup lang="ts">
import { ROUTES } from '~/configs/constants'
import { useCartStore } from '~/store/Cart.store'

const cartStore = useCartStore()
</script>
<template>
  <client-only>
    <div v-if="cartStore.fetching">در حال دریافت اطلاعات...</div>
    <div
      v-if="!cartStore.fetching && !cartStore.data.length"
      class="h-screen flex justify-center items-center text-3xl flex-col gap-4"
    >
      اطلاعاتی موجود نیست!!
      <nuxt-link :to="ROUTES.home" class="text-sm text-primary">
        بازگشت به صفحه اصلی
      </nuxt-link>
    </div>
    <section
      v-if="!cartStore.fetching && cartStore.data.length"
      class="py-5 px-2 lg:py-20 lg:px-36"
    >
      <div class="space-y-3">
        <lazy-course-card
          v-for="{
            id,
            title,
            amountOff,
            src,
            short_description
          } in cartStore.data"
          :key="id"
          class="relative overflow-hidden flex items-center justify-between shadow-sm bg-white p-2"
        >
          <template #header>
            <section class="flex items-center gap-2">
              <div class="w-24 h-24 relative hidden lg:block">
                <div
                  class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-5"
                ></div>
                <nuxt-img :src="src" class="h-full w-full" />
              </div>
              <div>
                <h3
                  class="pb-4 lg:line-clamp-2 max-w-[150px] text-nowrap text-ellipsis lg:w-auto lg:text-wrap hover:text-primary transition"
                >
                  {{ title }}
                </h3>
                <p
                  class="max-w-[40px] lg:max-w-[250px] text-xs text-gray-300 text-nowrap overflow-hidden text-ellipsis hidden lg:block"
                >
                  {{ short_description }}
                </p>
                <app-price-number :price="amountOff" class="lg:hidden block" />
              </div>
            </section>
          </template>

          <template #actions>
            <div class="lg:p-5 flex lg:flex-row gap-4 bg-white">
              <app-price-number :price="amountOff" class="hidden lg:flex" />
              <course-cart-action-btn
                :course-id="id"
                class="w-full text-xs lg:text-base lg:w-max"
              />
            </div>
          </template>
        </lazy-course-card>
      </div>
    </section>
  </client-only>
</template>
