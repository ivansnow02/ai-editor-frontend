<script setup lang="ts">
import {ref, watch} from 'vue'

import { authFunc } from '@/apis/auth';



const Username = ref("")
const UsernameStatus = ref("请输入新用户名称")
const Email = ref ("")
const EmailStatus = ref("邮箱@xxx.com")
const Password = ref ("")
const PasswordStatus = ref("请输入密码")
const ShowPassword = ref(false)
const VerifCodeStatus = ref("请输入邮箱验证码")
const formdata = ref(null)
const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const Password2 = ref("")
const Password2Status = ref("请再次输入密码")
const UsernamePattern = /^[\u4e00-\u9fa5a-zA-Z0-9]{6,12}$/
const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
const VerifCode = ref("")



// Functions
const Regist = () => {
  authFunc({
    obj_in: {
    username: Username.value,
    email: Email.value,
    access: 0,
    avatar: "string",
    password: Password.value
    },
    email_code: {
      email: Email.value,
      code: VerifCode.value
    }
  },
  'register'
  ).then(res => {
    alert("注册成功，请返回登录")
  }).catch(() => {
    alert("注册失败，请检查邮箱和验证码")
  })
}
const Send = () => {
  if(pattern.test(Email.value)){
    authFunc({
      email: Email.value,
      code: "string"
    },
    'send_code'
    ).then( (response) => {
      console.log(response.statusText)
      if(response.statusText === "OK"){
        VerifCodeStatus.value="验证码已发送至" +Email.value 
      }
    }).catch((error) => {
      console.log(error.toJSON());
      alert("邮箱异常")
    });
  }
  else{
    alert("邮箱格式有误");
    isActive.value = false
  }
}

const ifEmailMatch = () => {
    console.log(pattern.test(Email.value))
    console.log(Email.value)
}

const ifMassageMatch = () => {
    if(Password.value !== Password2.value){
        alert("两次输入密码不一致！")
    }

}


//Watches
watch(Username, () => {
  if(!UsernamePattern.test(Username.value)){
    // UsernameStatus.value = "用户名格式错误,8-16个字符,至少1个大写字母,1个小写字母和1个数字!"
    UsernameStatus.value = "非法昵称"
  }
  if(Username.value === ""){
    UsernameStatus.value = "请输入新用户名称"
  }
})
watch(Password, () => {
  if(Password.value === ""){
    PasswordStatus.value = "请输入密码"
  }
  else if(!PasswordPattern.test(Password.value)){
    PasswordStatus.value = "密码格式错误,8-16个字符,至少1个大写字母,1个小写字母和1个数字!"
  }
  else{
    PasswordStatus.value = "合格密码"
  }
})
watch(Email, () => {
  if(Email.value === ""){
    EmailStatus.value = "邮箱@xxx.com"

  }
  else if( !pattern.test(Email.value)) {
        EmailStatus.value = "邮箱格式不正确"
    }
  else{
    EmailStatus.value = "合法邮箱"
  }
  VerifCodeStatus.value = "请输入邮箱验证码"
}
)

watch(Password2, () => {
  if(Password.value !== Password2.value){
       Password2Status.value = "两次密码输入不一致"
    }
  else {
    Password2Status.value = "合格密码"
  }
})

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
      <v-card title="注册" class="Card">
        <v-form v-model="formdata">
            <v-text-field
            v-model.lazy="Username"
            :counter="10"
            :label="UsernameStatus"
            hide-details
            required
          ></v-text-field>
            <v-text-field
            v-model.lazy="Email"
            :counter="10"
            :label="EmailStatus"
            hide-details
            required
          ></v-text-field>
          <v-text-field
            v-model.lazy="Password"
            :counter="10"
            :label="PasswordStatus"
            hide-details
            required
            type="password"
          ></v-text-field>
          <!-- <v-switch
          v-model="ShowPassword"
          label="显示密码"
          ></v-switch> -->
    
          
          <v-text-field
            v-model.lazy="Password2"
            :counter="10"
            :label="Password2Status"
            hide-details
            required
            type="password"
            @change="confirmPassword2"
          ></v-text-field>
            <v-card 
            :title="VerifCodeStatus"
            class="Card"
            >
              <v-otp-input  
              v-model:="VerifCode"
              ></v-otp-input>
            </v-card>
          
      
         
          
        </v-form>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          
          <!-- <RouterLink to="./regist">regist</RouterLink> -->
          <v-btn
            text="获取验证码"
            @click="Send">
            </v-btn>
          <v-btn
          text="注册"
          @click="Regist"
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

<style scoped>
.Card{
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 15px;

}
</style>