<script lang="ts" setup>
import CustomTipTap from '@/components/CustomTipTap.vue'
import Login from '@/components/Login.vue'
</script>

<template>
  <v-app-bar border="0" flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>
      <Login />

      <v-spacer></v-spacer>
    </v-container>
  </v-app-bar>

  <CustomTipTap />
</template>

<style lang="scss" scoped></style>
