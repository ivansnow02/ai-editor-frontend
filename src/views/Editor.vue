<script lang="ts" setup>
import CustomEditor from '@/editor/CustomEditor.vue'
import AppMenu from '@/components/AppMenu.vue'
import AIComponent from '@/components/AIComponent.vue'
import { provide, ref } from 'vue'
import AIFormatComponent from '@/components/AIFormatComponent.vue'

const ocrURL = ref('')
const TiptapRef = ref<null | Record<string, any>>(null)
provide('TiptapRef', TiptapRef)
const selection = ref('')
const rail = ref(true)
provide('selection', selection)
provide('ocrURL', ocrURL)
provide('rail', rail)
</script>

<template>
  <a-layout>
    <!--  <v-app-bar border="0" flat>-->
    <!--    <v-container class="mx-auto d-flex align-center justify-center">-->
    <!--      <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>-->
    <!--      <Login />-->

    <!--      <v-spacer></v-spacer>-->
    <!--    </v-container>-->
    <!--  </v-app-bar>-->
    <AppMenu></AppMenu>

    <a-layout>
      <a-layout-content>
        <CustomEditor></CustomEditor>
      </a-layout-content>
      <AIComponent></AIComponent>
      <AIFormatComponent></AIFormatComponent>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped></style>
