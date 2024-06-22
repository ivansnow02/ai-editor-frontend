<script setup>
import {ref} from 'vue'
import { RouterLink } from 'vue-router';
import Verification_code from './VerificationCode.vue'

const Username = ref("")
const UsernameStatus = ref("请输入新用户名称")
const Email = ref ("")
const EmailStatus = ref("邮箱@xxx.com")
const Password = ref ("")
const PasswordStatus = ref("请输入密码")
const ShowPassword = ref(false)
const CodeStatus = ref("请输入验证码")
const formdata = ref(null)
const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const Password2 = ref("")
const Password2Status = ref("请再次输入密码")
const UsernamePattern = /^[\u4e00-\u9fa5a-zA-Z0-9]{6,12}$/
const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/



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
const confirmUsername = () => {
  if(!UsernamePattern.test(Username.value)){
    // UsernameStatus.value = "用户名格式错误,8-16个字符,至少1个大写字母,1个小写字母和1个数字!"
    UsernameStatus.value = "非法昵称"
  }
  if(Username.value === ""){
    UsernameStatus.value = "请输入新用户名称"
  }
}
const confirmPassword = () => {
  if(Password.value === ""){
    PasswordStatus.value = "请输入密码"
  }
  else if(!PasswordPattern.test(Password.value)){
    PasswordStatus.value = "密码格式错误,8-16个字符,至少1个大写字母,1个小写字母和1个数字!"
  }
  else{
    PasswordStatus.value = "合格密码"
  }

}
const confirmEmail = () => {
  console.log(Email.value)
  if(Email.value == ""){
    EmailStatus.value = "邮箱@xxx.com"

  }
  else if( !pattern.test(Email.value)) {
        EmailStatus.value = "邮箱格式不正确"
    }
  else{
    EmailStatus.value = "合法邮箱"

  }
}
const confirmPassword2 = () => {
  if(Password.value !== Password2.value){
       Password2Status.value = "两次密码输入不一致"
    }
  else {
    Password2Status.value = "合格密码"
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
            :label="UsernameStatus"
            hide-details
            required
            @change.lazy="confirmUsername"
          ></v-text-field>
            <v-text-field
            v-model.lazy="Email"
            :counter="10"
            :label="EmailStatus"
            hide-details
            required
            @change="confirmEmail"
          ></v-text-field>
          <v-text-field
            v-model="Password"
            :counter="10"
            :label="PasswordStatus"
            hide-details
            required
            type="password"
            @change="confirmPassword"
          ></v-text-field>
          <!-- <v-switch
          v-model="ShowPassword"
          label="显示密码"
          ></v-switch> -->
    
          
          <v-text-field
            v-model="Password2"
            :counter="10"
            :label="Password2Status"
            hide-details
            required
            type="password"
            @change="confirmPassword2"
          ></v-text-field>
            <v-otp-input             
            ></v-otp-input>
          
      
         
          
        </v-form>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          
          <!-- <RouterLink to="./regist">regist</RouterLink> -->
          <v-btn
            text="获取验证码"
            @click="">
            </v-btn>
          <v-btn
          text="注册"
          @click="ifMassageMatch"
          ></v-btn>
          <v-btn
            text="取消"
            @click="isActive.value = false"
          ></v-btn>
          <!-- <verification_code/> -->
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

</template>