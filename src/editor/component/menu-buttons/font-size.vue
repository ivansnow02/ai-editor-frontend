<template>
  <a-tooltip placement="top">
    <template #title>
      <span>标题</span>
    </template>
    <div class="header_button">
      <a-select v-model:value="value" :options="options" @change="handleChange" />
    </div>
  </a-tooltip>
</template>

<script lang="ts" setup>
import { defineModel, inject, type Ref } from 'vue'

const value = defineModel()
const options = [
  { value: 34.7, label: '一号' },
  { value: 32, label: '小一' },
  { value: 29.3, label: '二号' },
  { value: 24, label: '小二' },
  { value: 21.3, label: '三号' },
  { value: 20, label: '小三' },
  { value: 18.7, label: '四号' },
  { value: 16, label: '小四' },
  { value: 14, label: '五号' },
  { value: 12, label: '小五' },
  { value: 10, label: '六号' },
  { value: 8.7, label: '小六' },
  { value: 7.3, label: '七号' },
  { value: 6.7, label: '八号' }
]
const props = defineProps(['editor'])

const handleChange = (value: number) => {}
// const handleChange = (value: string) => {
//   console.log(`selected ${value}`)
// }
</script>

<style lang="scss" scoped>
.header_button {
  border: 1px solid transparent;
  box-sizing: border-box;
  align-items: center;
  border-radius: 50%;
  color: #303133;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 40px;
  margin: 2px;
  outline: 0;
  width: 75px;
  box-sizing: border-box;

  &--title {
    font-size: 17px;
  }
}

::v-deep .ant-select-selector {
  width: 100%;
  border: 1px solid #eee !important;
  border-radius: 5px !important;
}
</style>
