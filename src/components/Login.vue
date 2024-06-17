<script setup>
import {ref} from 'vue'
import { RouterLink } from 'vue-router';


const Acount = ref ("")
const Password = ref ("")
const formdata = ref(null)
</script>

<template>
    <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="登陆"
        variant="flat"
      ></v-btn>
    </template>
  
    <template v-slot:default="{ isActive }">
      <v-card title="登陆">
        <v-form v-model="formdata">
            <v-text-field
            v-model="Acount"
            :counter="10"
            :rules="nameRules"
            label="Username/Email/Acount"
            hide-details
            required
          ></v-text-field>
          <v-text-field
            v-model="Password"
            :counter="10"
            :rules="nameRules"
            label="Password"
            hide-details
            required
          ></v-text-field>
          
        </v-form>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn
            text="登陆"
            
          ></v-btn>
          <!-- <RouterLink to="./regist">regist</RouterLink> -->
          <v-btn
          text="取消"
          @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

</template>