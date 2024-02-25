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
            short_description,
            slug
          } in cartStore.data"
          :key="id"
          :to="`${ROUTES.courses}${'/'}${slug}`"
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
              <div class="space-x-1">
                <app-button
                  variant="secondary"
                  @click.stop.prevent="cartStore.deleteFromCart(id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </app-button>
              </div>
            </div>
          </template>
        </lazy-course-card>
      </div>
    </section>
  </client-only>
</template>
