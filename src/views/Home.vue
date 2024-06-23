<script setup>
import regist from '@/components/regist.vue';
import Login from '@/components/Login.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const jump = () => {
  router.push("/editor");
}

</script>
<template>
  <router-view></router-view>
  <v-sheet 
  :elevation="18" 
  :height="200" 
  :width="400" 
  right:100
  opacity: .10
  >
   <div>
    <v-card title="登录" subtitle="欢迎使用AI-Ediotr" text="Ai editor is an intelligent editor based on Baidu ERNIE Bot big model and Paddleocr">
  <v-card-actions >
    <Login/>
    <regist/>
    
    <VBtn url="/editor" @click="jump" variant="flat" color="surface-variant">开始编辑</VBtn>

  </v-card-actions>
</v-card>
   </div>
    

  </v-sheet>
   

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
  background-image: url("@/images/利姆萨罗敏萨.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: -1;                   
  -webkit-filter: opacity(70%); 
  filter: opacity(70%);
}
</style>