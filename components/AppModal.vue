<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    desc?: string
    modelValue: boolean
  }>(),
  { modelValue: false }
)
const emit = defineEmits(['update:modelValue'])
const closeModal = () => {
  emit('update:modelValue', false)
}
</script>
<template>
  <dialog
    @click="closeModal"
    id="my_modal_1"
    :class="`modal ${modelValue && 'modal-open'}`"
    v-bind="$attrs"
  >
    <div @click.stop="" class="modal-box">
      <slot name="title"
        ><h3 class="font-bold text-lg">{{ title }}</h3></slot
      >

      <slot name="body"
        ><p>{{ desc }}</p></slot
      >
      <div class="">
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
