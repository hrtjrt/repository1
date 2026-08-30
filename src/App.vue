<template>
  <div id="app">
    <BasicLayout />
  

  </div>
</template>

<script setup>
import BasicLayout from './layouts/BasicLayout.vue';
import { userLoginUserStore } from './store/useLoginUserStore.ts';





const loginUserStore = userLoginUserStore();
loginUserStore.fetchLoginUser();




</script>

<style>

</style>
