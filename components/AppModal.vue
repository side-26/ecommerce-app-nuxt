<template>
  <dialog
    @click="closeModal"
    id="my_modal_1"
    :class="`modal ${isMoalOpen&&'modal-open'}`"
    v-bind="$attrs"
  >
    <div @click.stop="" class="modal-box">
      <slot name="title"
        ><h3 class="font-bold text-lg">{{title}}</h3></slot
      >

      <slot name="body"
        ><p>{{desc }}</p></slot
      >
      <div class="modal-action">
        <!-- {{slots.action&&
        <form method="dialog">
          <slot name="action"></slot>
        </form>
        }} -->
        <slot name="action" :closeModal="closeModal"></slot>
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
import { useModal } from '~/composables/useModal';
const props=defineProps<{
  title?:string,
  desc?:string
}>()
const {isMoalOpen,closeModal}=useModal()
</script>
