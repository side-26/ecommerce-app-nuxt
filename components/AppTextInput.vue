<script setup lang="ts">
import { useField } from 'vee-validate'
import { watchEffect } from 'vue'
const props = withDefaults(
  defineProps<{
    type?: 'text' | 'number' | 'tel' | 'email' | 'password'
    name: string
    placeholder?: string
    label?: string
    modelValue?: string
    size?: 'md' | 'lg' | 'sm' | 'xs'
    isTextarea?: boolean
  }>(),
  {type:'text', size: 'md', isTextarea: false }
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const {
  meta,
  errorMessage,
  setValue,
  value: inputVal,
  handleBlur,
  handleChange
} = useField(props.name, undefined, {
  validateOnValueUpdate: false,
  initialValue: props.modelValue
})
watchEffect(() => {
  emit('update:modelValue', unref(inputVal))
})
watch(
  () => props.modelValue,
  value => setValue(value!)
)
</script>

<template>
  <div class="form-control w-full">
    <label class="label">
      <span v-if="label" class="label-text">{{ label }}</span>
    </label>
    <input
      v-if="!isTextarea"
      autocomplete="false"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="handleChange"
      :value="inputVal"
      @blur="handleBlur"
      v-bind="$attrs"
      :class="`input input-bordered w-full input-${size}  ${
        'input-error' && errorMessage
      }`"
    />
    <textarea
      v-else
      autocomplete="false"
      :name="name"
      :placeholder="placeholder"
      @input="handleChange"
      :value="inputVal"
      @blur="handleBlur"
      v-bind="$attrs"
      :class="`textarea textarea-bordered w-full textarea-${size}  ${
        'textarea-error' && errorMessage
      }`"
    ></textarea>
    <label class="label">
      <span
        v-if="errorMessage"
        :class="`label-text-alt ${'text-red-500' && errorMessage} text-red-500`"
        >{{ errorMessage }}</span
      >
    </label>
  </div>
</template>
