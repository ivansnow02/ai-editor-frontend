<script setup>
import {ref} from 'vue'
import { RouterLink } from 'vue-router';


const Username = ref("")
const Email = ref ("")
const Password = ref ("")
const ShowPassword = ref(false)
const formdata = ref(null)
const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const Password2 = ref("")

const ifEmailMatch = () => {
    console.log(pattern.test(Email.value))
    console.log(Email.value)
}
const ifMassageMatch = () => {
    if( !pattern.test(Email.value)) {
        alert("邮箱格式不正确！")
    }
    if(Password.value !== Password2.value){
        alert("两次输入密码不一致！")
    }

}
</script>

<template>
    <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="注册"
        variant="flat"
      ></v-btn>
    </template>
  
    <template v-slot:default="{ isActive }">

      <v-card title="注册">
        <v-form v-model="formdata">
            <v-text-field
            v-model="userName"
            :counter="10"
            :rules="nameRules"
            label="新用户名："
            hide-details
            required
          ></v-text-field>
            <v-text-field
            v-model="Email"
            :counter="10"
            :rules="nameRules"
            label="邮箱@xxx.com"
            hide-details
            required
          ></v-text-field>
          <v-row>
            
          <v-text-field
            v-model="Password"
            :counter="10"
            :rules="nameRules"
            label="密码"
            hide-details
            required
          ></v-text-field>
          <v-switch
          v-model="ShowPassword"
          label="显示密码"
          ></v-switch>
          </v-row>
          
          <v-text-field
            v-model="Password2"
            :counter="10"
            :rules="nameRules"
            label="重复密码"
            hide-details
            required
          ></v-text-field>
          
        </v-form>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          
          <!-- <RouterLink to="./regist">regist</RouterLink> -->
          <v-btn
          text="注册"
          @click="ifMassageMatch"
          ></v-btn>
          <v-btn
            text="取消"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

</template>