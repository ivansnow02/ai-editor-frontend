<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { authFunc } from '@/apis/auth'
import { setToken } from '@/utils/token'

const Username = ref('')
const Password = ref('')
const formData = new FormData()
formData.set('grant_type', '')
formData.set('username', '')
formData.set('password', '')
formData.set('scope', '')
formData.set('client', '')
formData.set('client_secret', '')
const router = useRouter()
watch(Username, () => {
  formData.set('username', Username.value)
})
watch(Password, () => {
  formData.set('password', Password.value)
})
const test = () => {
  console.log(formData.get(Username))
}

const Login = () => {
  authFunc(formData, 'token')
    .then((res) => {
      router.push('/editor')
      setToken(res.data.access_token)
      console.log(res.data.access_token)
      // isActive.value = false
    })
    .catch((error) => {
      alert(error)
    })
}
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="surface-variant" text="登陆" v-bind="activatorProps" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="登陆">
        <v-form>
          <v-text-field
            v-model.lazy="Username"
            :counter="10"
            label="Username"
            hide-details
            required
          ></v-text-field>
          <v-text-field
            v-model.lazy="Password"
            :counter="10"
            label="Password"
            hide-details
            required
            type="password"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              color="surface-variant"
              text="登陆"
              variant="flat"
              @click="Login(), (isActive.value = false)"
            ></v-btn>
            <!-- <RouterLink to="./regist">regist</RouterLink> -->
            <v-btn color="surface-variant" text="取消" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>