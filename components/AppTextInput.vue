<script setup lang="ts">
import { useField } from "vee-validate";
import {watchEffect} from "vue";
const props=withDefaults(defineProps<{
  type:'text'|'number'|'tel'|'email'|'password'
  name:string,
  placeholder:string,
  label?:string,
  modelValue:string,
  size:'md'|'lg'|'sm'|'xs'
}>(),{size:'md'})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void

}>()
const {meta,errorMessage,setValue,value:inputVal,handleBlur,handleChange}=useField(props.name,undefined,{
  validateOnValueUpdate:false,
  initialValue:props.modelValue
})
watchEffect(()=>{emit('update:modelValue',unref(inputVal))})
watch(()=>props.modelValue,(value)=>setValue(value))
</script>

<template>
  <div class="form-control w-full">
    <label class="label">
      <span v-if="label" class="label-text">{{label}}</span>
    </label>
    <input
      autocomplete="false"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="`input input-bordered w-full input-${size}  ${'input-error'&&errorMessage}`"
      @input="handleChange"
      :value="inputVal"
      @blur="handleBlur"
      v-bind="$attrs"
    />
    <label class="label">
      <span
        v-if="errorMessage"
        :class="`label-text-alt ${'text-red-500'&&errorMessage} text-red-500`"
        >{{errorMessage}}</span
      >
    </label>
  </div>
</template>
