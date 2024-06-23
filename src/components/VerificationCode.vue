<template>
     <v-dialog max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      color="surface-variant"
      text="获取验证码"
      variant="flat"
    ></v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card title="获取验证码">
      <v-card-text>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-otp-input></v-otp-input>
        <v-btn
          text="取消"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>

    
  </template>

  <script>
  </script>