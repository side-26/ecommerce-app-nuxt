<script setup lang="ts">
import { useCanBuyConsumer } from '~/composables/course/useCourseDetails'
import { BASE_URL } from '~/configs/api.config'
import { useAuthStore } from '~/store/Auth.store'
import { queryStringify } from '~/utils/helpers/queryStringify'
const props = defineProps<{ courseId: number | undefined }>()
const { canBuy, loading } = useCanBuyConsumer()
const authStore = useAuthStore()
const goToBank = () => {
  const sendItemObj = {
    key: authStore.getToken,
    course_id: props.courseId
  }
  const bankUrl = queryStringify(BASE_URL, sendItemObj)
  console.log(bankUrl)
}
</script>
<template>
  <div>
    <lazy-app-button
      v-if="canBuy && !loading"
      @click="goToBank"
      variant="secondary"
      class="text-white w-full"
    >
      خرید و انتقال به بانک
    </lazy-app-button>
  </div>
</template>
