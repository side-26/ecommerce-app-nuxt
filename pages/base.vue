<script setup lang="ts">


const inputVal=ref('232')
const handleChange=($event:any)=>{
    inputVal.value=$event.target.value
}
const {openModal}=useModal()
</script>
<template>
  <main>
    <AppTextInput
      name="title"
      v-model="inputVal"
      type="text"
      placeholder="fsdfasfsf"
      size="sm"
      class="input-primary min-h-[200vh]"
    />
    <AppButton @click="openModal" class="">open modal</AppButton>
    <input :value="inputVal" @input="handleChange" placeholder="write sth" />
    <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
    <AppModal title="hello how are you??" desc="what's up my friend?">
      <template #action="{closeModal}">
        <button @click="closeModal" class="btn">hello</button>
      </template>
    </AppModal>
  </main>
</template>
