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
  :height="768" 
  :width="1500" 
  right:100
  opacity: .10
  
  >
  <div class="box1">
      <v-card title="登录" subtitle="欢迎使用AI-Ediotr" text="Ai editor is an intelligent editor based on Baidu ERNIE Bot big model and Paddleocr" class="g-glossy" >
        
        <v-card-actions class="HomeBtn" >
          <v-spacer></v-spacer>
          <Login/>
          <regist/>
          <VBtn  @click="jump" variant="flat" color="surface-variant" class="btn1">开始编辑</VBtn>
        </v-card-actions>
      </v-card>
    </div>
  </v-sheet>


</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins',sans-serif;
}
.box1{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8EC5FC;
  background-image: linear-gradient(225deg, #8EC5FC 0%, #E0C3FC 50%, #ff3079 100%);
  /* filter: opacity(70%); */

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: -1;                   

}
/* .Card{
  filter: opacity(70%);
  border-radius: 15px;
  background-color: #8EC5FC;
  background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
} */
.g-glossy {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 15px;
}
.btn1{
  margin: 10px;
}
</style>