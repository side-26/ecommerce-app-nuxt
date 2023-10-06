<script setup lang="ts">
const inputVal=ref('232')
const handleChange=($event:any)=>{
    inputVal.value=$event.target.value
}
</script>
<template>
  <AppTextInput name="title" v-model="inputVal" type="text" placeholder="fsdfasfsf" />
  <input :value="inputVal" @input="handleChange" placeholder="write sth">
{{inputVal}}
</template>

<style scoped></style>
