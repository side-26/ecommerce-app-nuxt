<template>
  <h1>this is first page</h1>
  <div class="w-full">
    <AppButton @click="showAlert"> hello </AppButton>
  </div>
</template>
<script setup lang="ts">
const showAlert = () => {
  alert("hello");
};
</script>
