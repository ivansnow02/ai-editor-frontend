<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }" style="padding: 0">
    <!--    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />-->
    <AITrigger></AITrigger>
  </a-layout-header>
</template>
<style></style>
<script lang="ts" setup>
import AITrigger from './AITrigger.vue'
import { h, ref } from 'vue'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'

const current = ref<string[]>(['mail'])
const items = ref<MenuProps['items']>([
  {
    key: 'mail',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One'
  },
  {
    key: 'app',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two'
  }
])
</script>
