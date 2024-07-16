<script setup>

import LoginComponent from '@/components/LoginComponent.vue';
import {router} from '@/router/index';
const jump = () => {
  router.push("/");
}

</script>
<template>
  <router-view></router-view>




  <div class="box1">
      <a-card title="欢迎使用矿小计——智能文本编辑器" class="g-glossy" >

          <LoginComponent/>

      </a-card>
    </div>



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
  /* z-index: -1;                    */

}

.g-glossy {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 15px;
}
.btn1{
  margin: 10px;
}
</style>