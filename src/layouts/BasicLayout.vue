<template>

    <div id="basic-layout">
        <a-layout>

      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>

      <a-layout-content class="content">
        <router-view />
      </a-layout-content>

      <a-layout-footer class="footer">
        <a href="https://codefather.cn" target="_blank">
            编程导航
        </a>
      </a-layout-footer>

    </a-layout>
    </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';


</script>

<style scoped>
#basic-layout .footer{
  background-color:darkgray ;
  text-align: center;
  position:fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
#basic-layout .content{
  padding: 20px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}
#basic-layout .header{
  background-color: white;
  margin-bottom: 16px;
  color: unset;
  padding-inline: 20px;
}

</style>