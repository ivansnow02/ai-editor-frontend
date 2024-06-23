<script setup>
import AIEditor from './views/AIEditor.vue';
</script>

<template>
  <router-view></router-view>
</template>


<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins',sans-serif;
}
body{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/images/叹息海.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: -1;                    /*设置该标签等级，让其始终位于最上层*/
  -webkit-filter: opacity(60%);   /*设置透明度   blur还可以改变照片的模糊度*/
  filter: opacity(60%);

}
</style>

<script setup>

</script>


