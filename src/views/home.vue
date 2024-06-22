<script setup>
import regist from '@/components/regist.vue';
import Login from '@/components/Login.vue';
</script>
<template>
  <template>
  <v-responsive
    class="mx-auto"
    max-width="344"
  >
    <v-text-field
      hint="Enter your password to access this website"
      label="Password"
      type="input"
    ></v-text-field>
  </v-responsive>
</template>
   <regist/>
   <Login/>
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