<script lang="ts" setup>
import { inject, type Ref } from 'vue'
import { DownloadOutlined } from '@ant-design/icons-vue'

const rail = inject<Ref>('rail')

const handleClick = () => {
  rail.value = !rail.value
}
</script>
<template>
  <a-button shape="round" type="primary" @click="handleClick">
    <template #icon>
      <DownloadOutlined />
    </template>
  </a-button>
</template>
